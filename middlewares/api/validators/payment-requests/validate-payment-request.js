/**
 * @file /middlewares/validators/payment-requests/validate-payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { paymentRequestSchema } = require('../../../../schemas/zod/payment-requests');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export payment request validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = paymentRequestSchema.omit({ id: true }).safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
