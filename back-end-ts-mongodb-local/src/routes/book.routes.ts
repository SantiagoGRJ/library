
import express, { NextFunction, Request, Response } from 'express'
import Book from '../models/book.model'
import jwt from  'jsonwebtoken'
import { deleteBook, getAllBooks, getById, newBook, patchBook, updateBook } from '../controllers/userController';
import dotenv from 'dotenv'
dotenv.config()

const KEY_SECRET = process.env.KEY_SECRET || 'default-secret'

const router = express.Router()

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
        book = await Book.findById(id)
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

//MIDDLEWARE AUTH

const verifyToken = (req:Request,res:Response,next:NextFunction) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({error:"No autorizado al recurso"})
    }

    jwt.verify(token,KEY_SECRET,(err,_decoded)=> {
        if(err){
            console.log(err)
            return res.status(403).json({message:"Error token no valido"})
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