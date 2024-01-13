const { Category } = require("../models/category")



const checkCategories = async (categories)=>{
    const allCategories = await Category.find()
    const validCategoryNames = allCategories.map((item)=> item.category_name)
    const isValidCategories = validCategoryNames.includes(categories)
    const categoriesInfo = await Category.findOne({category_name : categories})
    return {isValidCategories,categoriesId : categoriesInfo?._id}
}



module.exports = {checkCategories}