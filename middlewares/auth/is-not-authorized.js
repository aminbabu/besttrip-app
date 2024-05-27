/**
 * @file /middlewares/auth/is-not-authorized.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 May, 2024
 * @update_date 27 May, 2024
 */

// dependencies
const { verifyToken } = require('../../utils');
const { Customer } = require('../../models');

// export unauthorized user middleware
module.exports = async (req, res, next) => {
    // get authorization from header or cookies
    const authorization = req.header('authorization') || req.cookies.token;

    // check if authorization is not exist
    if (!authorization) {
        return next();
    }

    // get token
    const token = authorization.replace('Bearer ', '');

    try {
        // verify token
        const payload = verifyToken(token);

        // check if user exists based on role by id, email, and status
        const user = await Customer.findOne({
            _id: payload.user._id,
            email: payload.user.email,
            status: 'active',
        });

        // check if user exists
        if (!user) {
            return next();
        }

        // return redirect to dashboard
        return res.redirect('/dashboard');
    } catch (error) {
        return next(error);
    }
};
