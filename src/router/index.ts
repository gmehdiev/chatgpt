import {Router} from "express";
import { activate, getUsers, registration } from "../middleware/userMiddleware";
import { body } from "express-validator";
export const router = Router()

router.post('/registration',
    body('email').isEmail(),
    body('email').isLength({min: 8, max:32}), 
    registration
)
router.post('/login')
router.post('/logout')
router.get('/activate/:link', activate)
router.get('/refresh')
router.get('/users', getUsers)
