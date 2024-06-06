import express from 'express'
import bookRoutes from './routes/book.routes'
import authRoutes from './routes/auth.routes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import cors from  'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/books',bookRoutes)
app.use('/auth',authRoutes)



mongoose.connect(process.env.DATABASE_URL||'mongodb+srv://SantiagoGRJ:saorichan15@cluster0.zpav82v.mongodb.net/Librarys?retryWrites=true&w=majority&appName=Cluster0',{dbName:process.env.DB_NAME})
// const db = mongoose.connection



export default app