/**
 * @file /controllers/auth/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const { confirmEmailVerification } = require('../../../mails');
const { Customer } = require('../../../models');
const { verifyToken, sendEmail, generateToken } = require('../../../utils');

// verify email controller
const verifyEmail = async (req, res, next) => {
    try {
        // get token from query
        const { token } = req.query;

        // verify token
        const payload = verifyToken(token);

        // check if token is valid
        const customer = await Customer.findById(payload.customer._id);

        // check if customer exists
        if (!customer) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // check if customer is already verified
        if (customer.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // update customer
        customer.isVerified = true;
        await customer.save();

        // generate token
        const newToken = generateToken(customer);

        // send email
        const info = await confirmEmailVerification(customer);
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // send response
        return res.status(200).json({
            message: 'Email verified',
            token: newToken,
        });
    } catch (err) {
        return next(err);
    }
};

// export
module.exports = verifyEmail;
