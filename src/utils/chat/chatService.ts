import { PrismaClient } from "@prisma/client"
import { filterMessage } from "../common/filterChatData"
import { chatgpt } from "./chatgptService"
// import { filterChatData } from "../common/filterChatData"

const prisma = new PrismaClient()
export const createChats = async (userId: string) => {
    try {
        const chat = await prisma.chat.create({
            data: {
                userUuid: userId
            }
        }) 
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


export const findMessages  = async (uuid: string) => {
    try {
        const messages = await prisma.message.findMany({
            where :{
                chatUuid: uuid
            }
        })
        return messages
    } catch (error) {
        console.log(error)
    }
}

export const sendMessages = async (uuid: string) => {
    try {
        const allMessages = await findAllMessages(uuid)
        if (!allMessages) return
        const filter = filterMessage(allMessages)     
        
        //  const jopa = JSON.stringify(filter)
        //@ts-ignore
       const chatgptAnswer = await chatgpt(filter)
       if (!chatgptAnswer) return
       await saveMessage(uuid, chatgptAnswer.role, chatgptAnswer.content)

    const asd = await findAllMessages(uuid)

    return asd
    } catch (error) {
        console.log(error)
    }
}

export const chatGptAnswer = async(uuid: string,role: string, content: string) =>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const saveMessage = async(uuid: string,role: string, content: string) =>{
    try {
        const messages = await prisma.message.create({
            data: {
                chatUuid: uuid,
                role: role,
                content: content
            }
        })
        return messages
    } catch (error) {
        
    }
}


export const findAllMessages = async( uuid: string) =>{
try {
    const messages = await prisma.message.findMany({
        where: {
            chatUuid: uuid,
        }
    })
    return messages
} catch (error) {
    
}
}