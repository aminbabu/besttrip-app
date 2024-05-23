/**
 * @file /middlewares/auth/is-not-authorized.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 May, 2024
 * @update_date 24 May, 2024
 */

// dependencies

// export unauthorized user middleware
module.exports = (req, res, next) => {
    // get authorization from header or cookies
    const authorization = req.header('authorization') || req.cookies.token;

    // check if token exists
    if (authorization) {
        return res.redirect('/dashboard');
    }

    // continue
    return next();
};
