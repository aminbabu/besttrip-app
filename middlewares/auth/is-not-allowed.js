/**
 * @file /middlewares/auth/is-not-allowed.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 May, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const { User, Customer } = require('../../models');

// is allowed middleware
module.exports =
    (roles = ['customer']) =>
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

            // check if user is not allowed and api is frontend
            if ((!user || roles.includes(user.role)) && res.locals.api === 'frontend') {
                return res.render('errors/403');
            }

            // check if user is not allowed and api is backend
            if ((!user || roles.includes(user.role)) && res.locals.api === 'backend') {
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
