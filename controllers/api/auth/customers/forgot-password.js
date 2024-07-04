/**
 * @file /controllers/api/auth/customers/forgot-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
const { Customer, Token } = require('../../../../models');
const { sendEmail, generateToken } = require('../../../../utils');
const { forgotPassword } = require('../../../../mails');

// export forgot password controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email } = req.body;

        // find customer by email
        const customer = await Customer.findOne({ email });

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // get existing tokens
        const tokens = await Token.find({
            customer: customer._id,
            type: 'reset-password',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map(
                (token) => token?.type === 'reset-password' && token.deleteOne()
            )
        );

        // generate token
        const token = generateToken(customer.toObject());

        // store token in db
        const tokenDoc = new Token({
            customer: customer._id,
            token,
            type: 'reset-password',
        });

        // prepare email
        const info = forgotPassword({
            user: customer.toObject(),
            token,
        });

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
            message: 'Password reset link sent to your email',
        });
    } catch (error) {
        return next(error);
    }
};
