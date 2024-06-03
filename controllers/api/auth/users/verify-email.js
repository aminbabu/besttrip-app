/**
 * @file /controllers/api/auth/users/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 27 May, 2024
 */

// dependencies
const moment = require('moment');
const { confirmEmailVerification } = require('../../../../mails');
const { User, Token } = require('../../../../models');
const { sendEmail, generateToken } = require('../../../../utils');
const { env } = require('../../../../config');

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
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // check if token is expired
        if (moment(emailVerificationToken.expires).isBefore(moment())) {
            return res.status(400).json({ message: 'Invalid or expired token' });
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
        user.isVerified = true;
        await user.save();

        // delete token
        await emailVerificationToken.deleteOne();

        // send email
        const info = await confirmEmailVerification(user.toObject());
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // generate token
        const newToken = generateToken(user);

        // set token in response
        res.set('authorization', `Bearer ${newToken}`);

        // set cookie in response
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: env.JWT_EXPIRY,
        });

        // return response
        // return res.status(200).json({
        //     message: 'Email verified successfully',
        // });

        // return email verification view
        return res.render('email-verification', {
            title: 'Email Verification',
            message: 'Email verified successfully',
        });
    } catch (err) {
        return next(err);
    }
};
