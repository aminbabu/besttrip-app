/**
 * @file /middlewares/api/auth/is-user-authorized.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const { env } = require('../../../config');
const { User, Customer } = require('../../../models');
const { verifyToken, generateToken } = require('../../../utils');

// authourize user
module.exports = async (req, res, next) => {
    let user;
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

        // user properties
        const userProperties = {
            _id: payload.user._id,
            email: payload.user.email,
        };

        // check if user exists based on role by id, email, and status
        if (payload.user.role === 'customer') {
            user = await Customer.findOne(userProperties);
        } else {
            user = await User.findOne(userProperties);
        }

        // check if user is not exist
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        // check if user is not active
        if (user.status !== 'active') {
            return res.status(401).json({
                message:
                    'Please contact administrator to activate your account',
            });
        }

        // generate token
        const newToken = generateToken(user);

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

        // set user in request
        req.user = user.toObject();

        // set locals
        res.locals.user = user.toObject();

        // proceed to next middleware
        return next();
    } catch (error) {
        return next(error);
    }
};
