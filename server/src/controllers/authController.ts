import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import CustomError from "../lib/utils/CustomError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new CustomError("Please provide all fields", 400));
  }
  const existingUser = await User.find({ email });
  if (existingUser.length > 0) {
    return next(new CustomError("User already exists", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please provide all fields", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("Invalid credentials", 401));
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new CustomError("Invalid credentials", 401));
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export { register, login };
