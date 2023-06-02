import {Router} from "express";
import { getUsers, registration } from "../middleware/userMiddleware";

export const router = Router()

router.post('/registration', registration)
router.post('/login')
router.post('/logout')
router.get('/activate/:link')
router.get('/refresh')
router.get('/users', getUsers)