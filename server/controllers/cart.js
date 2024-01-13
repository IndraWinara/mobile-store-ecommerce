const { Cart, Add } = require("../models/cart")
const { Product } = require("../models/product")
const { User } = require("../models/user")





const addToCart = async (req,res,next)=>{
    try {
        const productId = req.params.id
        const userId = req.user
        const userInfo = await User.findById(userId)
        const cartInfo = await Cart.findOne({owner : userInfo._id})
        const productInfo = await Product.findById(productId)
        if(!productInfo){
            return res.status(400).json({
                success : false,
                message : `Product ${productId} not found `
            })
        }
        if(userInfo._id.toString() !== cartInfo.owner.toString() && userInfo.role !== 'admin'){
            return res.status(400).json({
                success : false,
                message : 'Unauthorized User Cart controller'
            })
        }
        const newAdd = await Add.create({product : productInfo._id})
        await Cart.findByIdAndUpdate(cartInfo._id,{$push : {products: newAdd._id }})
        return res.status(200).json({
            success : true,
            message : 'Success Add to Cart'
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Error Add To Cart : ${error.message}`
        })
    }
}

const deleteCart = async(req,res,next)=>{
    try {
    const userId = req.user
    const addId = req.params.id
    const userInfo = await User.findById(userId)
    const cartInfo = await Cart.findOne({owner : userInfo._id})
    const addInfo = await Add.findById(addId)
    if(!addInfo){
        return res.status(400).json({
            success : false,
            message : 'Product not found'
        })
    }
    if(userInfo._id.toString() !== cartInfo.owner.toString() && userInfo.role !== 'admin'){
        return res.status(400).json({
            success : false,
            message : 'Unauthorized User Cart controller'
        })
    }
    await Add.findByIdAndDelete(addId)
    await Cart.findByIdAndUpdate(cartInfo._id,{$pull : {products : addId}})
    return res.status(200).json({
        success : true,
        message : 'Success Delete Cart list'
    })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : `Error Delete Cart : ${error.message}`
        })
    }
} 

module.exports = {addToCart,deleteCart}