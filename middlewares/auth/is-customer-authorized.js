/**
 * @file /middlewares/api/auth/is-customer-authorized.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const { env } = require('../../config');
const { Customer } = require('../../models');
const { verifyToken, generateToken } = require('../../utils');

// authourize customer
module.exports = async (req, res, next) => {
    // get authorization from header
    const authorization = req.header('authorization') || req.cookies.token;

    // check if authorization is not exist
    if (!authorization) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    // get token
    const token = authorization.replace('Bearer ', '');

    try {
        // verify token
        const payload = verifyToken(token);

        // check if customer exists based on role by id, email, and status
        const customer = await Customer.findOne({
            _id: payload.user._id,
            email: payload.user.email,
            status: 'active',
        });

        // check if customer is not exist
        if (!customer) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        // generate token
        const newToken = generateToken(customer);

        // set token in response
        res.set('authorization', `Bearer ${newToken}`);

        // set cookie in response
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: env.JWT_EXPIRY,
        });

        // set token in request
        req.token = newToken;

        // set customer in request
        req.customer = customer.toObject();

        // proceed to next middleware
        return next();
    } catch (error) {
        return next(error);
    }
};
