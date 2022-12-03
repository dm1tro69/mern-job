import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import {notFoundMiddleware} from "./middleware/not-found.js";
import {errorHandlerMiddleware} from "./middleware/error-handler.js";

dotenv.config()

const app = express()


app.use(express.json())


const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({message: 'Hello'})
})
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


