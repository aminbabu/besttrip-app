/**
 * @file /middlewares/validators/users/validate-user-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { userSchema } = require('../../../schemas/zod/users');
const { zodErrorHandler } = require('../../../handlers/errors');

// export validate user by id middleware
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = userSchema
        .pick({ id: true })
        .safeParse({ ...req.params, ...req.body });

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
