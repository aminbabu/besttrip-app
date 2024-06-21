/**
 * @file /middlewares/api/validators/users/validate-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { updatePasswordSchema } = require('../../../../schemas/zod/users');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export update user password validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = updatePasswordSchema.safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
