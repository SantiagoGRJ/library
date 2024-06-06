import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    name : String,
    email: String,
    password : String
})

export default model('User',userSchema)
