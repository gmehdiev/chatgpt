import { NextFunction, Request, Response } from "express";
import { AnonymousAuthentication, activateUser, loginUser, logoutUser, refreshUser, registrationUser } from "../utils/auth/userService";
import { validationResult } from "express-validator/src/validation-result";
import { HttpErrors } from "../helpers/error";
interface query {
    req: Request,
    res: Response,
    next:NextFunction,
}


export const registration = async (req:Request , res:Response , next:NextFunction )=> {
    try {
       const errors = validationResult(req);
       
       if (!errors.isEmpty()){
        return next(HttpErrors.BadRequest('asd', errors.array()))
       }
       const {refreshToken} = req.cookies;
        const {email, password} = req.body;
        const userData = await registrationUser(email, password, refreshToken)
        res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        next(error)
    }
}

export const login = async (req:Request , res:Response , next:NextFunction)=> {
    try {
        const {email, password} = req.body
        const userData = await loginUser(email, password)
        res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        next(error)
    }
}

export const logout = async (req:Request , res:Response , next:NextFunction)=> {
    try {
        const {refreshToken} = req.cookies;
        const token = await logoutUser(refreshToken);
        res.clearCookie('refreshToken')
        return res.json(token)
    } catch (error) {
        next(error)
    }
}

export const refresh = async (req:Request , res:Response , next:NextFunction)=> {
    try {
        const {refreshToken} = req.cookies;
        if (typeof refreshToken === 'undefined'){
            const userData = await AnonymousAuthentication()
            res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }
        const userData = await refreshUser(refreshToken)
        res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req:Request , res:Response , next:NextFunction)=> {
    try {
        res.json(['123','asd'])
    } catch (error) {
        next(error)
    }
}


export const activate = async (req:Request , res:Response , next:NextFunction)=> {
    try {
        const activateLink = req.params.link
        await activateUser(activateLink)
        return res.redirect(`http://vk.com`)
    } catch (error) {
        next(error)
    }
}


