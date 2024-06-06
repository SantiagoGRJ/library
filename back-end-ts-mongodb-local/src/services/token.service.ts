import jwt from 'jsonwebtoken'
import { IuserToken } from '../models/user.interface'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.KEY_SECRET || 'default-secret'

export const generateToken = (user: IuserToken) : string => {
    return jwt.sign({name:user.name,email:user.email},SECRET_KEY,{expiresIn:'1h'})
}