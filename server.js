import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import 'express-async-errors'
import mongoose from "mongoose";
import morgan from 'morgan'
import {notFoundMiddleware} from "./middleware/not-found.js";
import {errorHandlerMiddleware} from "./middleware/error-handler.js";
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

dotenv.config()

const app = express()
app.use(cors())

if (process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.use(express.json())


const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({message: 'Hello'})
})
app.get('/api/v1', (req, res) => {
    res.json({message: 'API'})
})


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsRoutes)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
   try {
       await mongoose.connect(process.env.DB_KEY, () => {
           console.log('db connect')
           app.listen(PORT, ()=> {
               console.log('server running...')
           })
       })
   }catch (e) {
       console.log(e.message)
   }
}
start()


