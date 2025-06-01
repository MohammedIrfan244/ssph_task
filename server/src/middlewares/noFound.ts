import { Request, Response, NextFunction } from "express";
import CustomError from "../lib/utils/CustomError";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(
    new CustomError(`Cannot find ${req.originalUrl} on this server`, 404)
  );
};

export default notFound;
