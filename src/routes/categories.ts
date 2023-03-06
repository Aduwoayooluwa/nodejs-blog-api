import { Request, Response } from "express";

const router = require("express").Router();
const Category = require("../models/category")

router.post("/", async (req: Request, res:Response) => {
    const newCategory = new Category(req.body)


    try {
        const saveCategory = await newCategory.save()
        res.status(200).json(saveCategory)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// get categories
router.get(":id", async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)

    }
    catch (error) {
        res.status(500).json(error)
    }
})

// get all categories
router.get("/", async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories)

    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router