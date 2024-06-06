import {model, Schema} from "mongoose";
import { IBook } from "../types";

const bookSchema =new Schema<IBook>({
    title:String,
    description:String
})

export default  model('Book',bookSchema)