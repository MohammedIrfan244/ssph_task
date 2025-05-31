import mongoose , { Schema , InferSchemaType , Model } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

export type IUser = InferSchemaType<typeof userSchema>;
const User: Model<IUser> = mongoose.model("User", userSchema);

export default User;