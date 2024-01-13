const mongoose = require("mongoose");

const roleEnum = Object.freeze({
  ADMIN : "admin",
  USER : "user",
  SELLER : "seller"
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: String,
  products : [{type : mongoose.Types.ObjectId , ref : 'Product' }],
  carts : [{type : mongoose.Types.ObjectId, ref : 'Cart'}],
  role : {type : String, enum : Object.values(roleEnum)}
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = { User };
