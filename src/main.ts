import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./router";
config()
const prisma = new PrismaClient()
const PORT = process.env.PORT ?? 5000;

const app = express()

app.listen(PORT)
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
