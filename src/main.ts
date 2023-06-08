import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./router";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { chatgpt } from "./utils/chat/chatgptService";
config()
const prisma = new PrismaClient()
const PORT = process.env.PORT ?? 5000;

const app = express()
const server = createServer(app);
server.listen(PORT)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)


// const qweqwe = async () =>{
//     const token = await prisma.token.deleteMany()
//     const users = await prisma.user.deleteMany()
//     const chat = await prisma.chat.deleteMany()
//     const message = await prisma.message.deleteMany()
//     console.log(users,token,chat, message )
// }
// qweqwe()


// chatgpt()