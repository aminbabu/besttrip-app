/**
 * @file /controllers/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
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
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // check if user is already verified
        if (user.isVerified) {
            return res.status(400).json({
                message: 'User is already verified',
            });
        }

        // get existing tokens
        const tokens = await Token.find({
            user: user._id,
            type: 'verify-email',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map((tokenItem) => tokenItem.type === 'verify-email' && tokenItem.deleteOne())
        );

        // generate token
        const token = generateToken(user.toObject());

        // store token in db
        const tokenDoc = new Token({
            user: user._id,
            token,
            type: 'verify-email',
        });
        await tokenDoc.save();

        // send verification email
        const info = await verifyEmail(user.toObject(), token);
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // return response
        return res.status(200).json({
            message: `Verification email sent to ${user.email}`,
        });
    } catch (error) {
        return next(error);
    }
};
