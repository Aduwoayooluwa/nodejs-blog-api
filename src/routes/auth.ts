import { Request, Response } from "express";

const router = require('express').Router()
const User = require('../models/Users');


// register
router.post('/register', async (req:Request, res: Response) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const user = await newUser.save()
        res.status(201).json(user)
    }
    catch (error:any) {
        res.status(500)
    }
})

module.exports = router