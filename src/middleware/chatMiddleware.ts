import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
import { createChats, findAllChat, findAllMessages, findMessages, saveMessage, sendMessages } from "../utils/chat/chatService"

const prisma = new PrismaClient()


export const createChat = async (req:Request , res:Response , next:NextFunction)=>{
    try {
        const userId = req.body.userUuid
        const chats = await createChats(userId)
        return res.json(chats)
    } catch (error) {
        
    }
}

export const getChats = async (req:Request , res:Response , next:NextFunction) =>{
    try {
        const userId = req.body.userUuid
        const chats = await findAllChat(userId)
        return res.json(chats)
    } catch (error) {
        
    }
}

export const getCurrentChat = async (req:Request , res:Response , next:NextFunction) =>{
    try {
        const chatId = req.body.uuid
        const chats = await findMessages(chatId)
        return res.json(chats)
    } catch (error) {
        
    }
}

export const sendMessage = async (req:Request , res:Response , next:NextFunction) => {
    try {
        const role = req.body.role
        const chatId = req.body.uuid
        const content = req.body.content
        await saveMessage(chatId, role, content)
        const allMessages = await findAllMessages(chatId)
        console.log(allMessages)
        return res.json(allMessages)
    } catch (error) {
        
    }
}

export const getAllMessages = async (req:Request , res:Response , next:NextFunction) => {
    try {
        const chatId = req.body.uuid
        const message = await findAllMessages(chatId)
        return res.json(message)
    } catch (error) {
        
    }
}

export const getGptAnswer = async (req:Request , res:Response , next:NextFunction) => {
    try {
        const chatId = req.body.uuid

        const gptAnswer = await sendMessages(chatId)
        return res.json(gptAnswer)
    } catch (error) {
        
    }
}
// export const createChat = async (userUuid: string) =>{
//     await prisma.chat.create({
//         data: {
//             userUuid: userUuid
//         }
//     })
// }