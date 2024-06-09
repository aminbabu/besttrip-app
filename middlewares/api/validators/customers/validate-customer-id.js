/**
 * @file /middlewares/api/validators/customers/validate-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { customerSchema } = require('../../../../schemas/zod/customers');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export validate customer by id middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = customerSchema.pick({ id: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
