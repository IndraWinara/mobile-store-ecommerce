const jwt = require('jsonwebtoken')
require('dotenv').config()



const sendToken = (id)=>{
    const token = jwt.sign({_id : id},process.env.SECRET,{expiresIn : '1d'})
    return token
}

const verifyToken = (token)=>{
    const verif = jwt.verify(token,process.env.SECRET)
    return verif._id.toString()
}

module.exports = {sendToken,verifyToken}