const { verifyToken } = require("../services/sendTOken")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(400).json({
            success : false,
            message : 'Unauthorized User'
        })
    }

    try {
        const user = verifyToken(token)
        req.user  = user 
        next()
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Unauthorized User`
        })
    }
}

module.exports = {authMiddleware}