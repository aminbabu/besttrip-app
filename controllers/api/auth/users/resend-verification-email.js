/**
 * @file /controllers/api/auth/users/send-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
const { verifyEmail } = require('../../../../mails');
const { sendEmail, generateToken } = require('../../../../utils');
const { Token, User } = require('../../../../models');

// export send verification email controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email } = req.body;

        // get user
        const user = await User.findOne({ email });

        // check if user exists
        if (!user) {
            return res.status(200).json({
                message: 'User not found',
            });
        }

        // check if user is already verified
        if (user.isVerified) {
            return res.status(200).json({
                message: 'User is already verified',
            });
        }

        // delete existing expired tokens
        await Token.deleteMany({
            user: user._id,
            type: 'verify-email',
            expiresAt: { $lt: new Date() },
        });

        // generate token
        const token = generateToken(user.toObject());

        // store token in db
        const tokenDoc = new Token({
            user: user._id,
            token,
            type: 'verify-email',
        });

        // prepare email
        const info = await verifyEmail(user.toObject(), token);

        // send email
        await sendEmail(
            info.to,
            info.subject,
            info.text,
            info.html,
            info.attachments,
            (err, info) => (err ? console.log(err) : console.log(info))
        );

        // save token
        await tokenDoc.save();

        // return response
        return res.status(200).json({
            message: `Verification email sent to ${user.email}`,
        });
    } catch (error) {
        return next(error);
    }
};
