/**
 * @file /middlewares/api/validators/users/validate-role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { userSchema } = require('../../../../schemas/zod/users');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export update user password validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = userSchema.pick({ role: true }).safeParse({ req.body });

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
