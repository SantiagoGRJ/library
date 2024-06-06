import { Request, Response } from "express";
import User from '../models/user.model'
import {  comparePassword, hashPassword } from "../services/auth.service";
import { generateToken } from "../services/token.service";



export const register = async (req : Request, res : Response) => {
    
    try {
        let {name,email,password} = req.body
        
        if(!name){
            return res.status(400).json({
                message:"Falta el campo Usuario"
            })
        }
        if(!email){
            return res.status(400).json({
                message:"Falta el campo Email"
            })
        }
        if(!password){
            return res.status(400).json({
                message:"Falta el campo Contraseña"
            })
        }

        let hashedPassword = await hashPassword(password)

        let newUser = new User({
            name,
            email,
            password:hashedPassword
        })

        let create = await newUser.save()

        let token = generateToken(create)
        res.json(token)



       
    } catch (error : any) {
        console.log(error)
        res.status(500).json({
            message:error.message
        })
    }
}

export const login = async (req:Request, res : Response) => {

    let {email,password} = req.body

    try {
        if(!email){
            return res.status(400).json({
                message:"Ingrese un Email"
            })
        }
        if(!password){
            return res.status(400).json({
                message:"Ingrese una Contraseña"
            })
        }

        let user  = await User.find({email:email})
        console.log(user)

        if(!user){
            return res.status(404).json({
                message:"Email no Encontrado"
            })
        }
        
        let passwordMatch = await comparePassword(password,user[0].password)
        
        if(!passwordMatch){
            return res.status(401).json({
                message:"Email o Contraseña Incorrecta"
            })
        }

        let token = generateToken(user[0])
        res.json(token)

        

    } catch (error:any) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }

}