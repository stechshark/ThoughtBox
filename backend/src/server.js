import express from 'express'                             //server
import cors from "cors"
import dotenv from 'dotenv'                               //.env

import notesRoutes from './routes/notesRoutes.js';        //api
import { connectDB } from './config/db.js';               //db
import ratelimiter from './middleware/rateLimiter.js'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()                                           //initialize .env 

const PORT=process.env.PORT                               //accesing port from .env
const app = express()                                     //calling express
                                               

app.use(
    cors({
        origin:"http://localhost:5173",
    })
)
app.use(express.json())                                   //middlewares - to access title & content from body (req.body) / parse JSON bodies
app.use(rateLimiter);

app.use((req, res, next) => {                             //our simple custom middleware
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    next();
})

app.use('/api/notes', notesRoutes)                        // notes routes for CRUD Operations

connectDB().then( () => {                                   //calling fn from db.js for db connection ...
    app.listen(PORT, ()=>{                                    //listen port
    console.log(`Server up & running on PORT ${PORT}`)
})
})

