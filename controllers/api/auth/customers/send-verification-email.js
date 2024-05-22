/**
 * @file /controllers/api/auth/customers/send-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 May, 2024
 */

// dependencies
const { verifyEmail } = require('../../../../mails');
const { sendEmail, generateToken } = require('../../../../utils');
const { Token, Customer } = require('../../../../models');

// export send verification email controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email } = req.body;

        // get customer
        const customer = await Customer.findOne({ email });

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // check if customer is already verified
        if (customer.isVerified) {
            return res.status(400).json({
                message: 'Customer is already verified',
            });
        }

        // get existing tokens
        const tokens = await Token.find({
            customer: customer._id,
            type: 'verify-email',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map((tokenItem) => tokenItem.type === 'verify-email' && tokenItem.deleteOne())
        );

        // generate token
        const token = generateToken(customer.toObject());

        // store token in db
        const tokenDoc = new Token({
            customer: customer._id,
            token,
            type: 'verify-email',
        });
        await tokenDoc.save();

        // send verification email
        const info = await verifyEmail(customer.toObject(), token);
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // return response
        return res.status(200).json({
            message: `Verification email sent to ${customer.email}`,
        });
    } catch (error) {
        return next(error);
    }
};
