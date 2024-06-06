import { Request, Response } from "express"
import { comparePassword, hashPassword } from "../services/password.service"
import prismaUser from '../models/user'
import { generateToken } from "../services/auth.service"



export const register = async (req: Request, res: Response): Promise<void> => {
    let { name, email, password } = req.body

    try {
        if (!name) {
            res.status(400).json({ message: "Falta el campo Name" })
            return
        }
        if (!email) {
            res.status(400).json({ message: "Falta el campo Email" })
            return
        }
        if (!password) {
            res.status(400).json({ message: "Falta el campo Password" })
            return
        }

        let hashedPassword = await hashPassword(password)

        let user  = await prismaUser.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
        let token = generateToken(user)
        res.status(201).json(token)


    } catch (error: any) {
        console.log(error)

        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({
                message:"Correo electronico ya utilizado. Ingrese otro diferente"
            })
            return
        }

        res.status(500).json({
            message: error.message
        })
        return
    }
}




export const login = async (req:Request,res:Response) : Promise<void> => {
    let {email,password} = req.body

    try {
        
        if (!email) {
            res.status(400).json({ message: "Falta el campo Email" })
            return
        }
        if (!password) {
            res.status(400).json({ message: "Falta el campo Password" })
            return
        }

        let user = await prismaUser.findUnique({where:{email}})

        if(!user) {
            res.status(404).json({
                error:" Usuario no encontrado"
            })
            return
        }

        let passwordMatch = await comparePassword(password,user.password)

        if(!passwordMatch){
            res.status(401).json({
                message:"Usuario o Contraseña incorrecta"
            })
            return
        }

        let token = generateToken(user)
        res.json(token)

        
    } catch (error: any) {
        res.status(500).json({
            error:error.message
        })
    }
 }