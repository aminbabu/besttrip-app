/**
 * @file /middlewares/validators/validateResetPassword.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 27 May, 2024
 */

// dependencies
const { resetPasswordSchema } = require('../../../../schemas/zod/auth');
const { zodErrorHandler } = require('../../../../handlers/errors');

// dependencies

// export validate reset password middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = resetPasswordSchema.safeParse({ ...req.query, ...req.body });

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
