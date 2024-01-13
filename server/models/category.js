const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    category_name : {type : String, required : true},
    products : [{type : mongoose.Types.ObjectId, ref : 'Product'}]
})

const Category = mongoose.models.Category || mongoose.model('Category',categorySchema)

module.exports = {Category}