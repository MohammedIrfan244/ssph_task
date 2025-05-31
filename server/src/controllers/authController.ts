import { Request , Response , NextFunction } from "express";
import  User  from "../models/userModel";
import CustomError from "../lib/utils/CustomError";


const register = async (req: Request, res: Response, next: NextFunction)=> {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return next(new CustomError("Please provide all fields", 400));
    }
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
        return next(new CustomError("User already exists", 400));
    }
    const user = new User({ username, email, password });
    await user.save();
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
}




export {register}