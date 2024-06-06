import { Request, Response } from 'express'
//import Book from '../models/book.model'
import { IBook } from '../types';
import prismaBook from '../models/book'

export const getAllBooks = async (_req: Request, res: Response): Promise<void> => {
    try {
        let books = await prismaBook.findMany()
        if (books.length === 0) {
            res.status(204).json([])
            return
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

  
    try {
        let newBook = await prismaBook.create({
            data:{
                title,
                description
            }
        })
        res.status(201).json(newBook)
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        })
    }

}

export const getById = async (req: Request, res: Response): Promise<void> => {
    let bookId = req.params.id
    
    try {
        let book = await prismaBook.findUnique({
            where:{
                id:bookId
            }
        })

        if(!book){
            res.status(404).json({
                message:"Libro no Encontrado"
            })
            return
        }
        res.status(200).json(book)

        
    } catch (error) {
        res.status(500).json({
            message:"Hubo un error.Intente mas tarde"
        })
    }
    
    
}

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        let book = res.locals.book
       
        book.title = req.body.title || book.title
        book.description = req.body.description || book.description
        
        let dataToUpdate : any = {...req.body}
        
        dataToUpdate.title = book.title
        dataToUpdate.description=book.description

        let updatedBook = await prismaBook.update({
            where:{
                id:book.id
            },
            data:dataToUpdate
        })
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

        let dataToUpdate : any = {...req.body}
        dataToUpdate.title = book.title
        dataToUpdate.description = book.description

        let updatedBook = await prismaBook.update({
            where:{
                id:book.id
            },
            data:dataToUpdate
        })

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
    await prismaBook.delete({
        where:{
            id:book.id
        }
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