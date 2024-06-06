
import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { deleteBook, getAllBooks, getById, newBook, patchBook, updateBook } from '../controllers/userController';
import prismaBook from '../models/book'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

//MIDDLEWARE
const getBook = async (req:Request,res:Response,next:NextFunction) : Promise<void>  => {
    let book;
    const { id } = req.params

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
         res.status(404).json({
            message:"Formato de ID no valido"
            
        })
        return
    }

    try{
        book = await prismaBook.findUnique({
            where:{
                id:id
            }
        })
        if(!book){
            res.status(404).json({
                message:"Libro no encontrado"
            })
            return
        }
       

    }catch(e : any){
        res.status(500).json({
            message:e.message
        })
        
    }

    res.locals.book=book


    next()
}

//MIDDLEWARE LOG IN 
const verifyToken = (req:Request,res:Response,next:NextFunction) => {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]

    if(!token){
       return res.status(401).json({erro:"No autorizado al recurso"}) 
    }
    jwt.verify(token,JWT_SECRET,(err,_decoded)=>{
        if(err){
            console.log(`Error en la autenticacion ${err}`)
             res.status(403).json({error:'No tiene acceso a esto recurso'})
             return
        }
    })
    
    next()

}

//Get All Books [GET]
router.get('/',verifyToken,getAllBooks)

// New Book [POST]
router.post('/',verifyToken,newBook)

// Get By Id [GET]
router.get('/:id',verifyToken,getBook,getById)

router.put('/:id',verifyToken,getBook, updateBook)

router.patch('/:id',verifyToken,getBook,patchBook)

router.delete('/:id',verifyToken,getBook,deleteBook)

export default router