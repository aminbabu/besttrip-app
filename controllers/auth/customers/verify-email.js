/**
 * @file /controllers/auth/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const moment = require('moment');
const { matchedData } = require('express-validator');
const { confirmEmailVerification } = require('../../../mails');
const { Customer, Token } = require('../../../models');
const { verifyToken, sendEmail } = require('../../../utils');

// export verify email controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { token } = matchedData(req);

        // get token
        const existingToken = await Token.findOne({
            token,
            type: 'verify-email',
        });

        // check if token exists
        if (!existingToken) {
            return res.status(404).json({ message: 'Token not found' });
        }

        // check if token is expired
        if (moment(existingToken.expires).isBefore(moment())) {
            return res.status(400).json({ message: 'Token expired' });
        }

        // verify token
        const verifiedToken = verifyToken(token);

        // check if token is valid
        const customer = await Customer.findById(verifiedToken.user._id);

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

        // get existing tokens
        const tokens = await Token.find({
            customer: customer._id,
            type: 'verify-email',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map((tokenItem) => tokenItem.type === 'verify-email' && tokenItem.deleteOne())
        );

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
