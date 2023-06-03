import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers/error";

export const errorMiddleware =  (err: Error, req: Request ,res:Response  ,next: NextFunction ) =>{
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'непредвиденная ошибка'})
}
