/**
 * @file /controllers/auth/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
 */

const moment = require('moment');
const { sendPasswordResetConfirmation } = require('../../../../mails');
const { Token, Customer } = require('../../../../models');
const { sendEmail } = require('../../../../utils');

// export reset password controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { token, password } = req.body;

        // check if the token exists
        const resetPasswordToken = await Token.findOne({
            token,
            type: 'reset-password',
        });

        if (!resetPasswordToken) {
            return res.status(400).json({
                message: 'Invalid or expired token',
            });
        }

        // check if token is expired
        if (moment(resetPasswordToken.expires).isBefore(moment())) {
            return res.status(400).json({
                message: 'Invalid or expired token',
            });
        }

        // get customer
        const customer = await Customer.findById(resetPasswordToken.customer);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // update customer password
        customer.password = password;
        await customer.save();

        // delete token
        await resetPasswordToken.deleteOne();

        // send email
        const info = await sendPasswordResetConfirmation(customer.toObject());
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // return response
        return res.status(200).json({
            message: 'Password reset successful',
        });
    } catch (error) {
        return next(error);
    }
};
