/**
 * @file /controllers/api/auth/customers/send-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 June, 2024
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
            return res.status(200).json({
                message: 'Customer not found',
            });
        }

        // check if customer is already verified
        if (customer.isVerified) {
            return res.status(200).json({
                message: 'Customer is already verified',
            });
        }

        // delete existing expired tokens
        await Token.deleteMany({
            customer: customer._id,
            type: 'verify-email',
            expiresAt: { $lt: new Date() },
        });

        // generate token
        const token = generateToken(customer.toObject());

        // store token in db
        const tokenDoc = new Token({
            customer: customer._id,
            token,
            type: 'verify-email',
        });

        // prepare email
        const info = await verifyEmail(customer.toObject(), token);

        // send email
        await sendEmail(
            info.to,
            info.subject,
            info.text,
            info.html,
            info.attachments,
            (err, info) => (err ? console.log(err) : console.log(info))
        );

        // save token
        await tokenDoc.save();

        // return response
        return res.status(200).json({
            message: `Verification email sent to ${customer.email}`,
        });
    } catch (error) {
        return next(error);
    }
};
