import { NextFunction, Request, Response } from "express";
import { activateUser, registrationUser } from "../service/userService";

interface query {
    req: Request,
    res: Response,
    next:NextFunction,
}


export const registration = async (req:Request , res:Response , next:NextFunction )=> {
    try {
        // console.log(req.body)
        const {email, password} = req.body;
        const userData = await registrationUser(email, password)
        if (typeof userData === 'undefined') return
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        console.log(error)
    }
}

export const login = async ({req, res, next} : query)=> {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const logout = async ({req, res, next} : query)=> {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const refresh = async ({req, res, next} : query)=> {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async ({req, res, next} : query)=> {
    try {
        res.json(['123','asd'])
    } catch (error) {
        console.log(error)
    }
}


export const activate = async (req:Request , res:Response , next:NextFunction)=> {
    try {
        console.log(req.params.link)
        const activateLink = req.params.link
        await activateUser(activateLink)
        return res.redirect(`http://vk.com`)
    } catch (error) {
        console.log(error)
    }
}

