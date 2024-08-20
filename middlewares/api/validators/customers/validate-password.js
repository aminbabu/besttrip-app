/**
 * @file /middlewares/api/validators/customers/validate-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 Aug, 2024
 * @update_date 20 Aug, 2024
 */

// dependencies
const { updatePasswordSchema } = require('../../../../schemas/zod/customers');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export update customer password validator
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
