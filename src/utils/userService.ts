import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as uuid from "uuid"
import { sendActivatonMail } from "./mailService"
import { findToken, generateTokens, removeToken, saveToken, validateRefreshToken } from "./tokenService"
import { filterUserData } from "./filterUserData"
import { HttpErrors } from "../helpers/error"
import { saveTokenAndReturnData } from "./common/saveTokenAndReturnData"

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
    return saveTokenAndReturnData(user)
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


export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where:{
            email :  email
        }
    })
    if(!user) {
        throw HttpErrors.BadRequest(); //нет юзера
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
        throw HttpErrors.BadRequest(); //неправильный пароль
    }

    return saveTokenAndReturnData(user)

}

export const logoutUser = async (resreshToken: string) => {
    const token = await removeToken(resreshToken)
    return token;
}

export const refreshUser = async (resreshToken: string) => {
    if(!resreshToken){
        throw HttpErrors.Unauthorized(); 
    }

    const userInfo = validateRefreshToken(resreshToken)
    const tokenFromDB = await findToken(resreshToken)
    if (!userInfo || !tokenFromDB){
        throw HttpErrors.Unauthorized(); 
    }
    if(typeof userInfo === 'string') return
    const user = await prisma.user.findUnique({
        where:{
            uuid :  userInfo.id
        }
    })
    if (!user){
        throw HttpErrors.Unauthorized(); 
    }
    return saveTokenAndReturnData(user)
}