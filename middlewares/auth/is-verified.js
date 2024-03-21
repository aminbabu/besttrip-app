/**
 * @file /middlewares/auth/is-verified.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 March 2024
 */

// dependencies
const { User } = require("../../models");

// is verified middleware
const isVerified = async (req, res, next) => {
  try {
    // get user
    const user = await User.findOne({ email: req.body.email });

    // check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email address",
      });
    }

    // continue to the next middleware
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// export
module.exports = isVerified;
