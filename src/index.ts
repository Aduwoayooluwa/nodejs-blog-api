import { Request, Response } from "express";

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('connected to mongo'))
.catch((err: Error) => console.log(err))

app.use(('/api/auth'), authRoute)
app.use(('/api/user'), userRoute)
app.use(('/api/posts'), postRoute)
app.use(('/api/category'), categoryRoute)

app.listen(5000, () => {
    console.log('Backend is running')
})