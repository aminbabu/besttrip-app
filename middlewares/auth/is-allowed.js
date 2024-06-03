/**
 * @file /middlewares/auth/is-allowed.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const { User } = require('../../models');

// is allowed middleware
module.exports =
    (roles = ['admin']) =>
    async (req, res, next) => {
        try {
            // get user id from request
            const { _id } = req.user;

            // find user
            const user = await User.findById(_id);

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
