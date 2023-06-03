import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as uuid from "uuid"
import { sendActivatonMail } from "./mailService"
import { generateTokens, saveToken } from "./tokenService"
import { filterUserData } from "./filterUserData"
import { HttpErrors } from "../helpers/error"

const prisma = new PrismaClient()

export const registrationUser = async (email: string, password: string) => {

    const candidate = await prisma.user.findUnique({
        where:{
            email :  email
        }
    })
    if (candidate) {
        throw HttpErrors.BadRequest();

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
    const userData = filterUserData(user)
    const tokens = generateTokens({...userData})

    await saveToken(userData.id, tokens.refreshToken)


    return {
        ...tokens,
        user: userData
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
            throw HttpErrors.BadRequest();
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