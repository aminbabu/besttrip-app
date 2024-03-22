/**
 * @file /controllers/auth/reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

const { Token, User } = require("../../models");
const moment = require("moment");
const { generateToken } = require("../../utils");

// reset password controller
const resetPassword = async (req, res, next) => {
  try {
    // get user input
    const { password } = req.body;
    const { token } = req.query;

    // check if the token exists
    const resetPasswordToken = await Token.findOne({
      token,
      type: "reset-password",
    });

    if (!resetPasswordToken) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // check if the token is valid
    const isTokenValid = moment(resetPasswordToken.expires) > moment();

    if (!isTokenValid) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // decode token and get user id
    const userId = resetPasswordToken.user;
    const user = await User.findById(userId);

    // save new password
    user.password = password;
    await user.save();

    // delete token
    await Token.findByIdAndDelete(resetPasswordToken._id);

    // generate token
    const newToken = generateToken({ user });

    // return response
    return res.status(200).json({
      message: "Password reset successful",
      token: newToken,
    });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = resetPassword;
