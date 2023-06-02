import { NextFunction, Request, Response } from "express";
import { registationUser } from "../service/userService";

interface query {
    req: Request,
    res: Response,
    next:NextFunction,
}


export const registation = async (req:Request , res:Response , next:NextFunction )=> {
    try {
        // console.log(req.body)
        const {email, password} = req.body;
        const userData = await registationUser(email, password)
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