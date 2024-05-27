/**
 * @file /middlewares/api/auth/is-verified.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 March, 2024
 * @update_date 27 May, 2024
 */

// dependencies
const { User, Customer } = require('../../../models');

// is verified user middleware
const isVerifiedUser = async (req, res, next) => {
    try {
        // get email
        const { email } = req.body || {};

        // get user
        const user = await User.findOne({ email });

        // check if user exists
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // check if user is verified
        if (!user.isVerified) {
            return res.status(400).json({
                message: 'Please verify your email address',
            });
        }

        // continue to the next middleware
        return next();
    } catch (error) {
        return next(error);
    }
};

// is verified customer middleware
const isVerifiedCustomer = async (req, res, next) => {
    try {
        // get email
        const { email } = req.body || {};

        // get customer
        const customer = await Customer.findOne({ email });

        // check if customer exists
        if (!customer) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // check if customer is verified
        if (!customer.isVerified) {
            return res.status(400).json({
                message: 'Please verify your email address',
            });
        }

        // continue to the next middleware
        return next();
    } catch (error) {
        return next(error);
    }
};

// export
module.exports = {
    user: isVerifiedUser,
    customer: isVerifiedCustomer,
};
