/**
 * @file /controllers/auth/send-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const moment = require('moment');
const { verifyEmail } = require('../../../mails');
const { sendEmail, generateToken } = require('../../../utils');
const { Token } = require('../../../models');

// send verification email controller
const sendVerificationEmail = async (req, res, next) => {
    try {
        // get customer from request
        const { user: customer } = req;

        // check if customer is already verified
        if (customer.isVerified) {
            return res.status(200).json({
                message: 'Customer already verified',
            });
        }

        const tokens = await Token.find({
            customer: customer._id,
            type: 'verify-email',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map(
                (token) =>
                    moment(token.expires) < moment() &&
                    token?.type === 'verify-email' &&
                    token.deleteOne()
            )
        );

        // generate token
        const token = generateToken(customer);

        // store token in db
        const tokenDoc = new Token({
            customer: customer._id,
            token,
            type: 'verify-email',
            expires: moment().add(1, 'hour').toDate(),
        });
        await tokenDoc.save();

        // send verification email
        const info = await verifyEmail(customer, token);
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // return response
        return res.status(200).json({
            message: `Verification email sent to ${customer.email}`,
        });
    } catch (error) {
        return next(error);
    }
};

// export
module.exports = sendVerificationEmail;
