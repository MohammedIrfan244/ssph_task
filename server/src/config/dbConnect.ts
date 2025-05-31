import mongoose from "mongoose";
import { infoLogger , errorLogger } from "../lib/utils/logger";


const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string )
        infoLogger("Database connected successfully");
    }catch(err){
        errorLogger("Database connection failed", err);
        throw new Error("Database connection failed");
    }
}

export default dbConnect;