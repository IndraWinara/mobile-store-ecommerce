const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { administator } = require('../middleware/rolebased')
const { createCategory, getCategory, getDetailCategory, updateCategory, deleteCategory } = require('../controllers/category')


const categoryRouter = express.Router()

categoryRouter.post('/category-create',[authMiddleware,administator],createCategory)
categoryRouter.get('/category',getCategory)
categoryRouter.get('/category/:id',getDetailCategory)
categoryRouter.patch('/category-update/:id',[authMiddleware,administator],updateCategory)
categoryRouter.delete('/category-delete/:id',[authMiddleware,administator],deleteCategory)


module.exports = {categoryRouter}