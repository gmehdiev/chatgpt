import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
import { createChats, findAllChat } from "../utils/chat/chatService"

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

export const sendMessage = async () =>{

}




// export const createChat = async (userUuid: string) =>{
//     await prisma.chat.create({
//         data: {
//             userUuid: userUuid
//         }
//     })
// }