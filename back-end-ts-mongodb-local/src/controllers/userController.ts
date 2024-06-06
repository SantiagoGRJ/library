import { Request, Response } from 'express'
import Book from '../models/book.model'
import { IBook } from '../types';


export const getAllBooks = async (_req: Request, res: Response)  => {
    try {
        let books = await Book.find()
         if (books.length === 0) {
           return res.status(204).json([])
          
        }

        res.json(books)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const newBook = async (req: Request, res: Response): Promise<void> => {
    const { title, description }: IBook = req.body

    if (!title || !description) {
        res.status(400).json({
            message: "Faltan campos"
        })
        return
    }

    const book = new Book({
        title,
        description
    })

    try {
        let newBook = await book.save()
        res.status(201).json(newBook)
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        })
    }

}

export const getById = async (_req: Request, res: Response): Promise<void> => {
    res.json(res.locals.book)  
}

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        let book = res.locals.book
       
        book.title = req.body.title || book.title
        book.description = req.body.description || book.description
        

        let updatedBook = await book.save()
        res.json(updatedBook)

    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
    }

}

export const patchBook = async (req:Request, res:Response) : Promise<void> => {
    
    if(!req.body.title && !req.body.description){
        res.status(404).json({
            message:"Ingresa al menos uno de los campos (Title or Description)"
        })
        return 
    }

    try {
        let book = res.locals.book
        book.title = req.body.title || book.title
        book.description = req.body.description || book.description


        let updatedBook = await book.save()

        res.json(updatedBook)
    } catch (error : any) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const deleteBook = async (_req:Request, res:Response) : Promise<void> => {
   try {
    let book = res.locals.book
    await book.deleteOne({
        _id:book._id
    })
    res.json({
        message:` ${book.title} fue eliminado correctamente`
    })
   } catch (error:any) {
    res.status(500).json({
        message:error.message
    })
   }
}