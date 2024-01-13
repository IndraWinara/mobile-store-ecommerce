const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { administator, seller } = require('../middleware/rolebased')
const { createProduct, getProduct, getDetailProduct, updateProduct, deleteProduct } = require('../controllers/product')

const productRouter = express.Router()

productRouter.post('/create-product',[authMiddleware,seller],createProduct)
productRouter.get('/product',getProduct)
productRouter.get('/product/:id',getDetailProduct)
productRouter.patch('/product-update/:id',[authMiddleware,seller],updateProduct)
productRouter.delete('/product-delete/:id',[authMiddleware,seller],deleteProduct)



module.exports = {productRouter}