/**
 * @file /controllers/api/auth/customers/login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
const { env } = require('../../../../config');
const { Customer } = require('../../../../models');
const { comparePassword, generateToken, ipInfo } = require('../../../../utils');

// export login customer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email, password } = req.body;

        // check if customer exists
        const customer = await Customer.findOne({ email })
            .select('+password')
            .populate('loginHistory wallet');

        if (!customer) {
            return res.status(401).json({
                message: 'Please check your email and password',
            });
        }

        // convert customer to object
        const customerObject = customer.toObject();

        // compare password
        const match = await comparePassword(password, customerObject.password);

        // check if password match
        if (!match) {
            return res.status(401).json({
                message: 'Please check your email and password',
            });
        }

        // check if customer status is active
        if (customer.status !== 'active') {
            return res.status(403).json({
                message: 'Customer is not active. Please contact support',
            });
        }

        // check if customer is verified
        if (!customer.isVerified) {
            return res.status(403).json({
                message: 'Please verify your email',
            });
        }

        // update and get customer history
        const history = await ipInfo(req, customerObject);

        // check if history status is blocked
        if (history.status === 'blocked') {
            return res.status(403).json({
                message: 'This account is blocked. Please contact support',
            });
        }

        // remove password, history from customer object
        delete customerObject.password;
        delete customerObject.loginHistory;

        // generate token
        const token = generateToken(customerObject);

        // save customer
        await customer.save();

        // set token in response
        res.set('authorization', `Bearer ${token}`);

        // set cookie in response
        res.cookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: env.JWT_EXPIRY,
        });

        // return response
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        return next(error);
    }
};
