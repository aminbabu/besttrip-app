/**
 * @file /controllers/auth/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 */

// dependencies
const { confirmEmailVerification } = require("../../mails");
const { User } = require("../../models");
const { verifyToken, sendEmail, generateToken } = require("../../utils");
const { sendMail } = require("../../utils");

// verify email controller
const verifyEmail = async (req, res, next) => {
  try {
    // get token from query
    const { token } = req.query;

    // verify token
    const payload = verifyToken(token);

    // check if token is valid
    const user = await User.findById(payload.user._id);

    // check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // update user
    user.isVerified = true;
    await user.save();

    // generate token
    const newToken = generateToken({ user });

    // send email
    const info = await confirmEmailVerification(user);
    await sendEmail(
      info.to,
      info.subject,
      info.text,
      info.html,
      info.attachments
    );

    // send response
    res.status(200).json({
      message: "Email verified",
      token: newToken,
    });
  } catch (err) {
    next(err);
  }
};

// export
module.exports = verifyEmail;
