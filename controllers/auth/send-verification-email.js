/**
 * @file /controllers/auth/send-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 */

// dependencies
const { verifyEmail } = require("../../mails");
const { sendEmail, generateToken } = require("../../utils");
const { Token } = require("../../models");
const moment = require("moment");

// send verification email controller
const sendVerificationEmail = async (req, res, next) => {
  try {
    // get user from request
    const user = req.user;
    const tokens = await Token.find({
      user: user._id,
      type: "verify-email",
    });

    // delete existing tokens
    await Promise.all(
      tokens.map(
        (token) =>
          moment(token.expires) < moment() &&
          token?.type === "verify-email" &&
          token.deleteOne()
      )
    );

    // generate token
    const token = generateToken({ user });

    // store token in db
    const tokenDoc = new Token({
      user: user._id,
      token,
      type: "verify-email",
      expires: moment().add(1, "hour").toDate(),
    });
    await tokenDoc.save();

    // send verification email
    const info = await verifyEmail(user, token);
    await sendEmail(
      info.to,
      info.subject,
      info.text,
      info.html,
      info.attachments
    );

    // return response
    return res.status(200).json({
      message: `Verification email sent to ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = sendVerificationEmail;
