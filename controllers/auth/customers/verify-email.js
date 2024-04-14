/**
 * @file /controllers/auth/customers/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const moment = require('moment');
const { confirmEmailVerification } = require('../../../mails');
const { Customer, Token } = require('../../../models');
const { sendEmail } = require('../../../utils');

// export verify email controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { token } = req.body;

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

        // get customer
        const customer = await Customer.findById(emailVerificationToken.customer);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // check if customer is already verified
        if (customer.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // update customer
        customer.isVerified = true;
        await customer.save();

        // delete token
        await emailVerificationToken.deleteOne();

        // send email
        const info = await confirmEmailVerification(customer.toObject());
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // send response
        return res.status(200).json({
            message: 'Email verified successfully',
        });
    } catch (err) {
        return next(err);
    }
};
