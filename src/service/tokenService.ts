import jwt from "jsonwebtoken" 
import { AuthCookies } from '../consts/secretKeys';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const generateTokens = (payload: string) =>{

    const accessToken = jwt.sign(payload, AuthCookies.ACCESS_TOKEN, {
        expiresIn: '30m'
    });
    const refreshToken = jwt.sign(payload, AuthCookies.REFRESH_TOKEN, {
        expiresIn: '30m'
    });
    return {
        accessToken, 
        refreshToken
    }


}

export const saveToken = async (userId, refreshToken) =>{
    const tokenData = prisma.user.findUnique(
        where{
            
        }
    )
}