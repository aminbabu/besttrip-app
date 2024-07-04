/**
 * @file /controllers/api/auth/users/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
const moment = require('moment');
const { confirmEmailVerification } = require('../../../../mails');
const { User, Token } = require('../../../../models');
const { sendEmail } = require('../../../../utils');

// export verify email controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { token } = req.query;

        // get token
        const emailVerificationToken = await Token.findOne({
            token,
            type: 'verify-email',
        });

        // check if token exists
        if (!emailVerificationToken) {
            return res
                .status(400)
                .json({ message: 'Invalid or expired token' });
        }

        // check if token is expired
        if (moment(emailVerificationToken.expires).isBefore(moment())) {
            return res
                .status(400)
                .json({ message: 'Invalid or expired token' });
        }

        // get user
        const user = await User.findById(emailVerificationToken.user);

        // check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check if user is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // update user
        user.set({
            isVerified: true,
            status: 'active',
        });

        // prepare email
        const info = await confirmEmailVerification(user.toObject());

        // send email
        await sendEmail(
            info.to,
            info.subject,
            info.text,
            info.html,
            info.attachments
        );

        // delete token
        await emailVerificationToken.deleteOne();

        // save user
        await user.save();

        // return response
        return res.status(200).json({
            message: 'Email verified successfully',
        });
    } catch (err) {
        return next(err);
    }
};
