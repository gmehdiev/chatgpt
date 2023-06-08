import jwt, { JwtPayload } from "jsonwebtoken" 
import { AuthCookies } from '../../consts/secretKeys';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface payload {
    email:string,
    id:string,
    isActivated: boolean,
}

interface payloadUuid{
    id: string
}
export const generateTokens = (payload: payload | payloadUuid) =>{

    const accsessToken = jwt.sign(payload, AuthCookies.ACCESS_TOKEN, {
        expiresIn: '30m'
    });
    const refreshToken = jwt.sign(payload, AuthCookies.REFRESH_TOKEN, {
        expiresIn: '30d'
    });

    return {
        accsessToken, 
        refreshToken
    }


}

export const saveToken = async (userId: string, refreshToken: string) =>{

    const tokenData = await prisma.token.findUnique({
        where: {
          userUuid: userId
        }
      });

    if(tokenData) {
    await prisma.token.update({  
            where: {
                userUuid: userId
            },
            data: {
                refreshToken: refreshToken
              }
        })
        return
    }
    const token = await prisma.token.create({
        data: {
            refreshToken: refreshToken,
            userUuid:     userId
        }
    })
    return token
}

export const removeToken = async (refreshToken: string) =>{
    const tokenData = await prisma.token.delete({
        where: {
            refreshToken: refreshToken
        }
    })
    return tokenData
}


export const findToken = async (refreshToken: string) =>{
    const tokenData = await prisma.token.findUnique({
        where: {
            refreshToken: refreshToken
        }
    })
    return tokenData
}

export const validateAccessToken = (token: string) => {
        try {
            const userData = jwt.verify(token, AuthCookies.ACCESS_TOKEN)
            return userData
        } catch (error) {
            return null
        }
}


export const validateRefreshToken = (token: string) => {
    try {
        const userData = jwt.verify(token, AuthCookies.REFRESH_TOKEN)
        return userData
    } catch (error) {
        return null
    }
}