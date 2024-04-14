/**
 * @file /controllers/auth/users/forgot-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { User, Token } = require('../../../models');
const { sendEmail, generateToken } = require('../../../utils');
const { forgotPassword } = require('../../../mails');

// export forgot password controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email } = req.body;

        // find user by email
        const user = await User.findOne({ email });

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // get existing tokens
        const tokens = await Token.find({
            user: user._id,
            type: 'reset-password',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map((token) => token?.type === 'reset-password' && token.deleteOne())
        );

        // generate token
        const token = generateToken(user.toObject());

        // store token in db
        const tokenDoc = new Token({
            user: user._id,
            token,
            type: 'reset-password',
        });
        await tokenDoc.save();

        // send mail
        const info = forgotPassword({
            user: user.toObject(),
            token,
        });
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // return response
        return res.status(200).json({
            message: 'Password reset link sent to your email',
        });
    } catch (error) {
        return next(error);
    }
};
