/**
 * @file /middlewares/auth/is-authorized.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const { User, Customer } = require('../../../models');
const { verifyToken } = require('../../../utils');
const { generateToken } = require('../../../utils');

// authourize user
module.exports = async (req, res, next) => {
    // get authorization from header
    const authorization = req.header('authorization');

    // check if token exists
    if (!authorization) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }

    // get token
    const token = authorization.replace('Bearer ', '');

    try {
        let user;

        // verify token
        const payload = verifyToken(token);

        // check if user exists based on role by id, email, and status
        if (payload.user.role === 'customer') {
            user = await Customer.findOne({
                _id: payload.user._id,
                email: payload.user.email,
                status: 'active',
            });
        } else {
            user = await User.findOne({
                _id: payload.user._id,
                email: payload.user.email,
                status: 'active',
            });
        }

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
            });
        }

        // generate token
        const newToken = generateToken(user);

        // set token in response
        res.set('authorization', `Bearer ${newToken}`);

        // set token in request
        req.token = newToken;

        // set user in request
        req.user = user.toObject();

        // proceed to next middleware
        return next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }
};
