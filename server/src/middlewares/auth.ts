import {  Response , NextFunction } from "express";
import { AuthenticatedRequest } from '../lib/types/type';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomError from "../lib/utils/CustomError";


const auth = (req :AuthenticatedRequest , res:Response, next:NextFunction) => {
    try {
         const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new CustomError("You are not authenticated",401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new CustomError("You are not authenticated",401));
    }
    if (token === "null") {
        return next(new CustomError("You are not authenticated",401));
        }
        jwt.verify(token, process.env.JWT_SECRET as string ,(err , decoded ) => {
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
        return next(new CustomError("You are not authenticated", 401));
    }
}

export default auth