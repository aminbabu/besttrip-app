/**
 * @file /controllers/auth/forgot-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

// dependencies
const moment = require('moment');
const { User } = require('../../../models');
const { sendEmail, generateToken } = require('../../../utils');
const { forgotPassword: forgotPasswordMailer } = require('../../../mails');
const { Token } = require('../../../models');

// forgot password controller
const forgotPassword = async (req, res, next) => {
    try {
        // find user by email
        const user = await User.findOne({ email: req.body.email });

        // check if user exists
        if (!user) {
            return res.status(400).json({
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
            tokens.map(
                (token) =>
                    moment(token.expires) < moment() &&
                    token?.type === 'reset-password' &&
                    token.deleteOne()
            )
        );

        // generate token
        const token = generateToken(user.toObject());

        // store token in db
        const tokenDoc = new Token({
            user: user._id,
            token,
            type: 'reset-password',
            expires: moment().add(1, 'hour').toDate(),
        });
        await tokenDoc.save();

        // send mail
        const info = forgotPasswordMailer({
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

// export
module.exports = forgotPassword;
