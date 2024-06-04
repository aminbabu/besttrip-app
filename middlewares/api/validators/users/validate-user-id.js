/**
 * @file /middlewares/api/validators/users/validate-user-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { userSchema } = require('../../../../schemas/zod/users');
const { zodErrorHandler } = require('../../../../handlers/api/errors');

// export validate user by id middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = userSchema.pick({ id: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
