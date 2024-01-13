const { User } = require("../models/user");

const userRole = async (userId) => {
  const user = await User.findById(userId);
  return user.role;
};

module.exports = { userRole };
