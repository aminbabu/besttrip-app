/**
 * @file /middlewares/auth/is-authorized.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const { User } = require('../../models');
const { verifyToken } = require('../../utils');

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
        // verify token
        const payload = verifyToken(token);

        // check if user exists
        const user = await User.findById(payload.user._id);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
            });
        }

        // set user in request
        req.user = user.toObject();

        // continue to next middleware
        return next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }
};
