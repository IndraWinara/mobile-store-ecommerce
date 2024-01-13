const { Category } = require("../models/category");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const { checkCategories } = require("../services/checkCategories");

const createProduct = async (req, res, next) => {
  try {
    const { name, description, owner, categories, image } = req.body;
    const userId = req.user;
    //validasi categories
    const allCategories = await Category.find();

    // Mendapatkan daftar nama kategori dari daftar kategori
    const validCategoryNames = allCategories.map(
      (category) => category.category_name
    );

    // Memeriksa apakah semua kategori yang diinput sesuai dengan daftar nama kategori yang valid
    const isValidCategories = validCategoryNames.includes(categories);

    if (!isValidCategories) {
      return res.status(400).json({
        success: false,
        message: "Invalid category names provided",
      });
    }

    const addCategories = await Category.findOne({
      category_name: categories,
    });

    const payload = {
      name,
      description,
      owner: userId,
      categories: addCategories,
      image,
    };
    const newProduct = await Product.create(payload);
    await Category.findByIdAndUpdate(addCategories._id, {
      $push: { products: newProduct._id },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { products: newProduct._id },
    });
    return res.status(200).json({
      success: true,
      message: "Success Create Product",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error Create Product : ${error.message}`,
    });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const data = await Product.find().populate([
      {
        path: "owner",
        model: User,
        select : ['_id','email','username']
      },
      {
        path: "categories",
        model: Category,
        select : ['_id','category_name']
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "success get product",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error Get Data ${error.message}`,
    });
  }
};

const getDetailProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    const data = await Product.findById(productId).populate([
      {
        path: "owner",
        model: User,
        select : ['_id','email','username']
      },
      {
        path: "categories",
        model: Category,
        select : ['_id','category_name']
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "success get product",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error Get Data ${error.message}`,
    });
  }
};


const updateProduct = async (req,res,next) =>{
  try {
    const {name,description,image,categories} = req.body
    const productId = req.params.id
    const userId = req.user
    const userInfo = await User.findById(userId)
    const productInfo = await Product.findById(productId)
    if(userInfo._id.toString() !== productInfo.owner.toString() && userInfo.role !== 'admin'){
      return res.status(401).json({
        success : false,
        message : 'Unauthorized User'
      })
    }
    const result = await checkCategories(categories)
    if(result.isValidCategories === false){
      return res.status(401).json({
        success : false,
        message : 'Invalid Categories'
      })
    }
    const payload = {name,description,image,categories:result.categoriesId}
    await Product.findByIdAndUpdate(productId,payload)
    return res.status(200).json({
      success : true,
      message : `Success Update Product : ${productId}`
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : `Error Update Product : ${error.message}`
    })
  }
}


const deleteProduct = async (req,res,next)=>{
  try {
    const userId = req.user
    const productId = req.params.id
    const userInfo = await User.findById(userId)
    const productInfo = await Product.findById(productId)
    const categoryInfo = await Category.findById(productInfo.categories.toString())
    if(userId.toString() !== productInfo.owner && userInfo.role !== 'admin'){
      return res.status(401).json({
        success : false,
        message : 'Unauthorized User'
      })
    }
    await Product.findByIdAndDelete(productInfo._id)
    await User.findByIdAndUpdate(userId,{
      $pull : {products : productInfo._id}
    })
    await Category.findByIdAndUpdate(categoryInfo._id,{
      $pull : {products : productInfo._id}
    })

    return res.status(200).json({
      status : false,
      message : 'Success Delete Product'
    })
  } catch (error) {
    return res.status(500).json({
      success : 'false',
      message : `Error Delete Product : ${error.message}`
    })
  }
}

module.exports = { createProduct, getProduct, getDetailProduct,updateProduct,deleteProduct };
