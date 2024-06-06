import jwt from 'jsonwebtoken'
import {IUser} from '../models/user.interface'
import dotenv  from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'secret-default'

export const generateToken = (user : IUser) : string => {
    return jwt.sign({user:user.id,email:user.email},JWT_SECRET)
}