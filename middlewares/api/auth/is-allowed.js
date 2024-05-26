/**
 * @file /middlewares/api/auth/is-allowed.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 March, 2024
 * @update_date 26 May, 2024
 */

// dependencies
const { User, Customer } = require('../../../models');

// is allowed middleware
module.exports =
    (roles = ['admin']) =>
    async (req, res, next) => {
        try {
            let user;
            // get user id from request
            const { _id } = req.user;

            // find user
            if (req.user.role === 'customer') {
                user = await Customer.findById(_id);
            } else {
                user = await User.findById(_id);
            }

            // check if user is allowed or user is not found
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({
                    message: 'You are not allowed to access this resource',
                });
            }

            // continue
            return next();
        } catch (error) {
            return next(error);
        }
    };
