/**
 * @file /middlewares/validators/customers/update-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { customerSchema } = require('../../../schemas/zod/customers');
const { zodErrorHandler } = require('../../../handlers/errors');

// update customer validator
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = customerSchema.safeParse({ ...req.params, ...req.body });

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
