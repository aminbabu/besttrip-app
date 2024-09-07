/**
 * @file /middlewares/api/validators/invoice/validate-invoice-payment-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const { zodErrorHandler } = require('../../../../handlers/errors');
const { invoiceSchema } = require('../../../../schemas/zod/invoice');

// export validate payment type middleware
module.exports = (req, res, next) => {
    // validate request params for paymentType
    const { error, success } = invoiceSchema
        .pick({ paymentType: true })
        .safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
