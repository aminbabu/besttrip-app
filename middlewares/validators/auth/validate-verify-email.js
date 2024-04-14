/**
 * @file /middlewares/validators/validateVerifyEmail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { verifyEmailSchema } = require('../../../schemas/zod/auth');
const { zodErrorHandler } = require('../../../handlers/errors');

// dependencies

// export validate verify email middleware
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = verifyEmailSchema.safeParse(req.body);

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
