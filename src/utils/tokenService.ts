import jwt from "jsonwebtoken" 
import { AuthCookies } from '../consts/secretKeys';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface payload {
    email:string,
    id:string,
    isActivated: boolean,
}
export const generateTokens = (payload: payload) =>{

    const accessToken = jwt.sign(payload, AuthCookies.ACCESS_TOKEN, {
        expiresIn: '30m'
    });
    const refreshToken = jwt.sign(payload, AuthCookies.REFRESH_TOKEN, {
        expiresIn: '30d'
    });
    return {
        accessToken, 
        refreshToken
    }


}

export const saveToken = async (userId: string, refreshToken: string) =>{
    const tokenData = prisma.token.findUnique({  
        where: {
            userUuid: userId
        }
    }).then(res =>{
        if (res == null) return
        res.refreshToken = refreshToken;
        return res
    })

    const token = await prisma.token.create({
        data: {
            refreshToken: refreshToken,
            userUuid:     userId
        }
    })

    return token
}