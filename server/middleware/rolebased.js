const { userRole } = require("../services/userRole");

const administator = async (req, res, next) => {
  try {
    const userId = req.user
    const role = await userRole(userId);
    if (role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `Unauthorized User di admin`,
      });
    }
    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unauthorized User : ${error.message}`,
    });
  }
};


const seller = async (req, res, next) => {
    try {
      const userId = req.user
      const role = await userRole(userId);
      if (role !== "seller" && role !== "admin") {
        return res.status(401).json({
          success: false,
          message: `Unauthorized User di seller`,
        });
      }
      next()
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Unauthorized User : ${error.message}`,
      });
    }
  };

module.exports = {administator,seller}
