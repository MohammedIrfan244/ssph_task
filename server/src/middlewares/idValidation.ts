import { NextFunction, Request, Response } from "express";
import CustomError from "../lib/utils/CustomError";

const idValidation = (req : Request, res:Response, next:NextFunction) => {
    const postId = req.params.id;

    if (!postId) {
        return next(new CustomError("Post ID is required", 400));
    }

    if (!/^[0-9a-fA-F]{24}$/.test(postId)) {
        return next(new CustomError("Invalid Post ID format", 400));
    }

    next();
}


export default idValidation;