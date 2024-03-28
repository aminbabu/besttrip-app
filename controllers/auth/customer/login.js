/**
 * @file /controllers/auth/login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const { Customer } = require('../../../models/index');
const { comparePassword, generateToken } = require('../../../utils');

// login customer controller
const login = async (req, res, next) => {
    try {
        // get customer input
        const { email, password } = req.body;

        // check if customer exists
        const customer = await Customer.findOne({ email }).select('+password');

        if (!customer) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // compare password
        const match = await comparePassword(password, customer.password);

        if (!match) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // generate token
        const token = generateToken({ customer: customer.toObject() });

        // return response
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export
module.exports = login;
