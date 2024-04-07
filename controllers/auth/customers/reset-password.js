/**
 * @file /controllers/auth/reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

const moment = require('moment');
const { Token, Customer } = require('../../../models');

// export reset password controller
module.exports = async (req, res, next) => {
    try {
        // get customer input
        const { password } = req.body;
        const { token } = req.query;

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

        // check if the token is valid
        const isTokenValid = moment(resetPasswordToken.expires) > moment();

        if (!isTokenValid) {
            return res.status(400).json({
                message: 'Invalid or expired token',
            });
        }

        // decode token and get customer id
        const customerId = resetPasswordToken.customer;
        const customer = await Customer.findById(customerId);

        // save new password
        customer.password = password;
        await customer.save();

        // delete token
        await resetPasswordToken.deleteOne();

        // return response
        return res.status(200).json({
            message: 'Password reset successful',
        });
    } catch (error) {
        return next(error);
    }
};
