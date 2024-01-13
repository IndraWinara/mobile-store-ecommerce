const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String, required : true},
    image : {type : String, required : true},
    categories : {type : mongoose.Types.ObjectId , ref : 'Category'},
    owner : {type : mongoose.Types.ObjectId, ref : 'User'}
})

const Product = mongoose.models.Product || mongoose.model('Product',productSchema)

module.exports = {Product}