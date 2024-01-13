const express = require('express')
const { registerUser, loginUser, userProfile, passwordChange, getAllUser } = require('../controllers/user')
const { authMiddleware } = require('../middleware/auth')
const {administator } = require('../middleware/rolebased')

const userRouter = express.Router()


userRouter.post('/register-user',registerUser)
userRouter.post('/login-user',loginUser)
userRouter.get('/me',[authMiddleware],userProfile)
userRouter.get('/user-all',[authMiddleware,administator],getAllUser)
userRouter.patch('/password-change',authMiddleware,passwordChange)

module.exports = {userRouter}