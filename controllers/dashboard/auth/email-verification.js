/**
 * @file controllers/dashboard/auth/view-email-verification.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// dependencies
const moment = require('moment');
const { Token } = require('../../../models');
const { User } = require('../../../models');
const { confirmEmailVerification } = require('../../../mails');
const { sendEmail } = require('../../../utils');

// export verify-email view controller
module.exports = async (req, res) => {
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
            return res.render('dashboard/auth/email-verification', {
                title: 'Email Verification',
                data: {
                    status: 'Invalid Token or Expired Token',
                    message:
                        'Provided token is invalid or expired. Please resend verification email to get a new token.',
                },
            });
        }

        // check if token is expired
        if (moment(emailVerificationToken.expires).isBefore(moment())) {
            return res.render('dashboard/auth/email-verification', {
                title: 'Email Verification',
                data: {
                    status: 'Expired Token',
                    message:
                        'Provided token is expired. Please resend verification email to get a new token.',
                },
            });
        }

        // get user
        const user = await User.findById(emailVerificationToken.user);

        // check if user exists
        if (!user) {
            return res.render('dashboard/auth/email-verification', {
                title: 'Email Verification',
                data: {
                    status: 'User Not Found',
                    message: 'User not found. Please resend verification email to get a new token.',
                },
            });
        }

        // check if user is already verified
        if (user.isVerified) {
            return res.render('dashboard/auth/email-verification', {
                title: 'Email Verification',
                data: {
                    status: 'Already Verified',
                    message: 'User is already verified. Please login to your account.',
                },
            });
        }

        // update user
        user.isVerified = true;
        await user.save();

        // delete token
        await emailVerificationToken.deleteOne();

        // send email
        const info = await confirmEmailVerification(user.toObject());
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        return res.render('dashboard/auth/email-verification', {
            title: 'Email Verification',
            data: {
                status: 'Email Verified',
                message:
                    'Email verified successfully. You can now login to your account and start using our services.',
            },
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
