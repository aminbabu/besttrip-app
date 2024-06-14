/**
 * @file /middlewares/api/validators/payment-requests/validate-payment-requests-by-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { paymentRequestSchema } = require('../../../../schemas/zod/payment-requests');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export payment requests by status validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = paymentRequestSchema.pick({ status: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
