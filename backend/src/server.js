import express from 'express'                             //server
import cors from "cors"
import dotenv from 'dotenv'                               //.env
import path from 'path'
import fs from "fs"

import notesRoutes from './routes/notesRoutes.js';        //api
import { connectDB } from './config/db.js';               //db
import ratelimiter from './middleware/rateLimiter.js'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()                                           //initialize .env 

const app = express()                                     //calling express
const PORT=process.env.PORT                               //accesing port from .env
const __dirname = path.resolve()
                                               

if(process.env.NODE_ENV !== "production"){
    app.use(
    cors({
        origin:"http://localhost:5173",
    })
)
}
app.use(express.json())                                   //middlewares - to access title & content from body (req.body) / parse JSON bodies
app.use(rateLimiter);

app.use((req, res, next) => {                             //our simple custom middleware
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    next();
})

app.use('/api/notes', notesRoutes)                        // notes routes for CRUD Operations

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

connectDB().then( () => {                                   //calling fn from db.js for db connection ...
    app.listen(PORT, ()=>{                                    //listen port
    console.log(`Server up & running on PORT ${PORT}`)
})
})

