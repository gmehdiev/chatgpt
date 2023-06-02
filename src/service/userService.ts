import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import uuid from "uuid"
import { sendActivatonMail } from "./mailService"

const prisma = new PrismaClient()

export const registation = async (email: string, password: string) => {
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
    await sendActivatonMail(email, activationLink)
} catch (error) {
    console.log(error)
}
}