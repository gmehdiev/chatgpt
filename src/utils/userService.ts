import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as uuid from "uuid"
import { sendActivatonMail } from "./mailService"
import { findToken, generateTokens, removeToken, saveToken, validateRefreshToken } from "./tokenService"
import { filterAnonUserData, filterUserData } from "./common/filterUserData"
import { HttpErrors } from "../helpers/error"
import { saveTokenAndReturnData } from "./common/saveTokenAndReturnData"

const prisma = new PrismaClient()

export const registrationUser = async (email: string, password: string, refreshToken: string ) => {

    const candidate = await prisma.user.findUnique({
        where:{
            email :  email
        }
    })
    if (candidate) {
        throw HttpErrors.BadRequest();
    }
    
    const userInfoFromToken = validateRefreshToken(refreshToken)
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    if(typeof userInfoFromToken === 'string' || userInfoFromToken === null) return
    const user = await prisma.user.update({
            where: {
                uuid: userInfoFromToken.id
            },
            data: {
            email : email,
            password: hashPassword,
            activationLink: activationLink
            }
        });

    await sendActivatonMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
    return saveTokenAndReturnData(user)
}

export const activateUser = async (activationLink: string) =>{
    const user = await prisma.user.findFirst({
        where: {
            activationLink: activationLink
        }
    }).then(res =>{
        
        if (!res) {

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
    if(user.password === null) return
    
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
        throw HttpErrors.BadRequest(); //неправильный пароль
    }
return saveTokenAndReturnData(user)
}

export const logoutUser = async (refreshToken: string) => {
    const token = await removeToken(refreshToken)
    return token;
}

export const refreshUser = async (refreshToken: string) => {
    if(!refreshToken){
        throw HttpErrors.Unauthorized(); 
    }
    const userInfo = validateRefreshToken(refreshToken)
    const tokenFromDB = await findToken(refreshToken)
   
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


export const AnonymousAuthentication = async () =>{
    const user = await prisma.user.create({
        data: {
        }
    })
    return saveTokenAndReturnData(user)
}