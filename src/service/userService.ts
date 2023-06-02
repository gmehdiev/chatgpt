import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as uuid from "uuid"
import { sendActivatonMail } from "./mailService"
import { generateTokens, saveToken } from "./tokenService"
import { userDto } from "../dtos/userDto"

const prisma = new PrismaClient()

export const registrationUser = async (email: string, password: string) => {
try {
    const candidate = await prisma.user.findUnique({
        where:{
            email :  email
        }
    })
    if (candidate) {
        throw new Error(`Пользователь с почтой ${email} существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await prisma.user.create({
        data: {
            email : email,
            password: hashPassword,
            activationLink: activationLink
        }
    })
    await sendActivatonMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
    const userData = userDto(user)
    const tokens = generateTokens({...userData})

    await saveToken(userData.id, tokens.refreshToken)


    return {
        ...tokens,
        user: userData
    }

   
} catch (error) {
    console.log(error)
}
}

export const activateUser = async (activationLink: string) =>{
    const user = await prisma.user.findFirst({
        where: {
            activationLink: activationLink
        }
    }).then(res =>{
        console.log(res);
        if (!res) {
            console.log("asd");
            throw new Error('Некорректная ссылка активации');
        }
        return prisma.user.update({
            where: {
                uuid: res.uuid
            },
            data: {
                isActivated: true
            }
        });
    })

}