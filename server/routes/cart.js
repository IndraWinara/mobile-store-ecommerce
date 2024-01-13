const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { addToCart, deleteCart } = require('../controllers/cart')


const cartRouter = express.Router()

cartRouter.post('/cart-add/:id',[authMiddleware],addToCart)
cartRouter.delete('/cart-delete/:id',[authMiddleware],deleteCart)


module.exports = {cartRouter}