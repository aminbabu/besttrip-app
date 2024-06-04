/**
 * @file /middlewares/dashboard/validators/auth/validate-verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// dependencies
const { verifyEmailSchema } = require('../../../../schemas/zod/auth');
const { zodErrorHandler } = require('../../../../handlers/dashboard/errors');

// dependencies

// export validate verify email middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = verifyEmailSchema.safeParse(req.query);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
