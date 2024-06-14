/**
 * @file /middlewares/api/validators/roles/validate-role-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { roleSchema } = require('../../../../schemas/zod/roles');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export role id validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = roleSchema.pick({ id: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
