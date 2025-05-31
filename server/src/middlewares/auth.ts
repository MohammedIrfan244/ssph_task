import {  Response , NextFunction } from "express";
import { AuthenticatedRequest } from '../lib/types/type';
import jwt from 'jsonwebtoken';

const auth = (req :AuthenticatedRequest , res:Response, next:NextFunction) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. No token provided."
        });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET as string ,(err : unknown, decoded) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token. Please log in again."
                });
            }
            const {userId} = decoded as { userId: string };
            req.user =  userId 
        }) 
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token. Please log in again."
        });
    }
}