import { Request, Response } from "express";

const router = require('express').Router()
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// register
router.post('/register', async (req:Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save()
        res.status(201).json(user)
    }
    catch (error:any) {
        res.status(500)
    }
})

// login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ username: req.body.username})
        !user && res.status(400).json("Wrong Credentials")

        const validate = await bcrypt.comapre(req.body.password, user.password)
        !validate && res.status(400).json("Wrong Credentials")

        const { password, ...others} = user._doc
        res.status(200).json(others)
    }
    catch(error: any) {

    }
})

module.exports = router