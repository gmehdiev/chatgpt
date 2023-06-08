import {Router} from "express";
import { activate, getUsers, login, logout, refresh, registration } from "../middleware/userMiddleware";
import { body } from "express-validator";
import { createChat, getChats } from "../middleware/chatMiddleware";
export const router = Router()

router.post('/registration',
    body('email').isEmail(),
    body('email').isLength({min: 8, max:32}), 
    registration
)
router.post('/login', login)
router.post('/logout', logout)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.get('/users', getUsers)

router.post('/createChat', createChat)
router.post('/getChat', getChats)