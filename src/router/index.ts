import {Router} from "express";
import { getUsers, registation } from "../middleware/userMiddleware";

export const router = Router()

router.post('/registation', registation)
router.post('/login')
router.post('/logout')
router.get('/activate/:link')
router.get('/refresh')
router.get('/users', getUsers)