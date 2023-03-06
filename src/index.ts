import { Request, Response } from "express";

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer');

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('connected to mongo'))
.catch((err: Error) => console.log(err))

// type of the multer function parameters
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

// storage for multer
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
        callback(null, "images")
    },
    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
        callback(null, req.body.name)
    }
    })
//  uploading
const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"), (req: Request, res: Response) => {
    try {
        res.status(200).json("File has been uploaded succesfully")
    }
    catch (error) {
        res.status(500).json(error)
    }
    
})

app.use(('/api/auth'), authRoute)
app.use(('/api/user'), userRoute)
app.use(('/api/posts'), postRoute)
app.use(('/api/category'), categoryRoute)

app.listen(5000, () => {
    console.log('Backend is running')
})