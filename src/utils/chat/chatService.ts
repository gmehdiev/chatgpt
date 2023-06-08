import { PrismaClient } from "@prisma/client"
// import { filterChatData } from "../common/filterChatData"

const prisma = new PrismaClient()
export const createChats = async (userId: string) => {
    try {
        console.log(userId)
        const chat = await prisma.chat.create({
            data: {
                userUuid: userId
            }
        }) 
        console.log(chat)
        const chats = await findAllChat(userId)
        return chats
    } catch (error) {
        console.log(error)
    }
}


export const findAllChat = async (userId: string) => {
    try {
        const chats = await prisma.chat.findMany({
            where: {
                userUuid: userId
            }
        })
        return chats
    } catch (error) {
        console.log(error)
    }
    
}