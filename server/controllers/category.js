const { Category } = require("../models/category")
const { Product } = require("../models/product")

const createCategory = async (req,res,next)=>{
    try {
        const {category_name} = req.body
        const payload = {category_name}
        await Category.create(payload)
        return res.status(200).json({
            success : true,
            message : 'Success Create Category'
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Error Create Category : ${error.message}`
        })
    }
}

const getCategory = async (req,res,next)=>{
    try {
        const data = await Category.find().populate({
            path : 'products',
            model : Product
        })
        return res.status(200).json({
            success : true,
            message : 'Success Get Category',
            data
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Error Get Category : ${error.message}`
        })
    }
}

const getDetailCategory = async (req,res,next)=>{
    try {
        const categoryId = req.params.id
        const data = await Category.findById(categoryId).populate({
            path : 'products',
            model : Product
        })
        return res.status(200).json({
            success : true,
            message : 'Success Get Category',
            data
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Error Get Category : ${error.message}`
        })
    }
}

const updateCategory = async (req,res,next)=>{
    try {
        const {category_name} = req.body
        const categoryId = req.params.id
        const payload = {category_name}
        await Category.findByIdAndUpdate(categoryId,payload)
        return res.status(200).json({
            success : true,
            message : 'Success update Category'
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Error update Category : ${error.message}`
        })
    }
}


const deleteCategory = async (req,res,next)=>{
    try {
        const categoryId = req.params.id
        await Category.findByIdAndDelete(categoryId)
        return res.status(200).json({
            success : true,
            message : 'Success Delete Category'
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Error Delete Category : ${error.message}`
        })
    }
}

module.exports = {createCategory,deleteCategory,getCategory,getDetailCategory,updateCategory}