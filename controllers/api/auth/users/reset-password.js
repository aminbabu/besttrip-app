/**
 * @file /controllers/api/auth/users/reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 27 May, 2024
 */

const moment = require('moment');
const { sendPasswordResetConfirmation } = require('../../../../mails');
const { Token, User } = require('../../../../models');
const { sendEmail } = require('../../../../utils');

// export reset password controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { password } = req.body;
        const { token } = req.query;

        // check if the token exists
        const resetPasswordToken = await Token.findOne({
            token,
            type: 'reset-password',
        });

        if (!resetPasswordToken) {
            return res.status(400).json({
                message: 'Invalid or expired token',
            });
        }

        // check if token is expired
        if (moment(resetPasswordToken.expires).isBefore(moment())) {
            return res.status(400).json({
                message: 'Invalid or expired token',
            });
        }

        // get user
        const user = await User.findById(resetPasswordToken.user);

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // update user password
        user.password = password;
        await user.save();

        // delete token
        await resetPasswordToken.deleteOne();

        // send email
        const info = await sendPasswordResetConfirmation(user.toObject());
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // return response
        return res.status(200).json({
            message: 'Password reset successful',
        });
    } catch (error) {
        return next(error);
    }
};
