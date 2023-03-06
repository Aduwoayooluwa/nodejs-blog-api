import { Request, Response } from "express";

const router = require('express').Router()
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const Post = require('../models/Posts');
// Update
router.put('/:id', async (req:Request, res:Response) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateuser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json(updateuser)
        } catch (error) {
            res.status(500).json(error)
        }    
    }
    else {
        res.status(401).json("You can only udate on your account!")
    }
    
})

// delete
router.delete('/:id', async (req:Request, res:Response) => {
    if (req.body.userId === req.params.id) {
    try {
        const user = await User.findById(req.params.id);
    
        try {
            await User.findByIdAndDelete(req.params.id);
            await Post.deleteMany({ username: user.username })
            res.status(200).json("User has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }    
        }catch (error) {
            res.status(404).json("User not found")
        }
    }
    
    else {
        res.status(401).json("You can only udate on your account!")
    }
    
})
// get user
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)

    }catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router