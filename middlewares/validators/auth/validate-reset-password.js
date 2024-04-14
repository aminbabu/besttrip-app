/**
 * @file /middlewares/validators/validateResetPassword.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { resetPasswordSchema } = require('../../../schemas/zod/auth');
const { zodErrorHandler } = require('../../../handlers/errors');

// dependencies

// export validate reset password middleware
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = resetPasswordSchema.safeParse(req.query);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // set validated data
    req.body = data;

    // proceed to next middleware
    return next();
};
