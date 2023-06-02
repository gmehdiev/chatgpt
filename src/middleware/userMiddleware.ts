import { NextFunction, Request, Response } from "express";

interface query {
    req: Request,
    res: Response,
    next:NextFunction,
}


export const registation = async ({req, res, next} : query)=> {
    try {
        
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