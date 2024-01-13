const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const { sendToken } = require("../services/sendTOken");
const { Product } = require("../models/product");
const { Cart, Add } = require("../models/cart");

const registerUser = async (req, res) => {
  try {
    
    const { username, email, password, role } = req.body;
    console.log(username)
    //check role admin
    if(role === "admin"){
      const allUser = await User.find()
      const validUserRole = allUser.map((user)=> user.role)
      //check apakah ada role admin terdaftar
      const isAdminExist = validUserRole.includes('admin')
      if(isAdminExist){
        return res.status(401).json({
          success : false,
          message : 'request to Administrator first'
        })
      }
    }
    const hashPassword = await bcrypt.hash(password, 10); 
    const payload = { username, email, password: hashPassword ,role};
  
    const newUser = await User.create(payload);
    // await Cart.findByIdAndUpdate(newCart._id,{$push : {owner : newUser._id}})
    // await User.findByIdAndUpdate(newUser._id,{carts : newCart._id})
    return res.status(200).json({
      success: true,
      message: "Register Success",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `Error register User ${error.message}`,
    });
  }
};

const loginUser = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = sendToken(isEmailExist._id);
    return res.status(200).json({
      success: true,
      message: "login success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error register Login ${error.message}`,
    });
  }
};

const userProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const data = await User.findById(userId).select("-password").populate([
      {
        path : 'products',
        model : Product,
      },
      {
        path : 'carts',
        model : Cart,
        populate : {
          path : 'products',
          model : Add,
          populate : {
            path : 'product',
            model : Product
          }
        }
      },
    ])
    return res.status(200).json({
      success: true,
      message: "success get profile",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error Login ${error.message}`,
    });
  }
};

const passwordChange = async (req,res,next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user;
    const user = await User.findById(userId);
    const checkOld = await bcrypt.compare(oldPassword, user.password);
    if (checkOld === false) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }
    const newAdd = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: newAdd });
    return res.status(200).json({
      success: false,
      message: "Password Changed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error change password ${error.message}`,
    });
  }
};


const getAllUser = async(req,res,next)=>{
  try {
    const data = await User.find().select('-password')
    return res.status(200).json({
      success : true,
      message : 'Success get All User Information',
      data
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : `Error get all user : ${error.message}`
    })
  }
}

module.exports = { registerUser, loginUser, userProfile, passwordChange, getAllUser};