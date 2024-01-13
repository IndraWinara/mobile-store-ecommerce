const mongoose = require('mongoose')

const addSchema = new mongoose.Schema({
    product : {type:mongoose.Types.ObjectId, ref: 'Product'}
})

const cartSchema = new mongoose.Schema({
    owner : {type : mongoose.Types.ObjectId,  ref : 'User'},
    products : [{type:mongoose.Types.ObjectId, ref: 'Product'}]
})

const Cart = mongoose.models.Cart || mongoose.model('Cart',cartSchema)
const Add = mongoose.models.Add || mongoose.model('Add',addSchema)


module.exports = {Cart,Add}
