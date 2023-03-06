import { Request, Response } from "express";
import { rmSync } from "fs";

const router = require('express').Router()
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const Post = require('../models/Posts');

// create Post
router.post('/', async (req:Request, res:Response) => {
    const newPost = new Post(req.body);

    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)

    } catch (error) {
        res.status(500).json(error)
    }
    
})

// update post
router.put('/:id', async (req:Request, res:Response) => {
    try {
        const post = await Post.findById(req.params.id)

        try {
            if (post.username === req.body.username) {
                try {
                        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                            $set: req.body
                        }, {
                            new: true
                        })
                        res.status(200).json(updatedPost)
                }catch (error) {

                }
            } else {
                res.status(401).json('Yoiu can update only your own post!')
            }
        }
        catch (error) {}


    }catch (error) {

    }
    
})

// delete Post
router.delete('/:id', async (req:Request, res:Response) => {
    try {
        const post = await User.findById(req.params.id);
    if (post.username === req.body.username) { 
        try {
            await post.delete({ username: post.username })
            res.status(200).json("Post has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }  
    }
        }catch (error) {
            res.status(404).json("User not found")
        }
    }
    
)
// get Post
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    }catch (error) {
        res.status(500).json(error)
    }
})

// get all Post
router.get('/', async (req: Request, res: Response) => {
    const username = req.query.user;
    const categoryName = req.query.cat;

    try {
        let posts;
        if (username) {
            posts = await Post.find({username: username})

        }
        else if (categoryName) {
            posts = await Post.find({categories: {
                $in: [categoryName]
            }})
        }
        else {
            posts = await Post.find()
        }
        res.status(200).json(posts)

    }catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router