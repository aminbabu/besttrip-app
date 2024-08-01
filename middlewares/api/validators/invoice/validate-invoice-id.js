/**
 * @file /middlewares/api/validators/invoice/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const { zodErrorHandler } = require('../../../../handlers/errors');
const { invoiceSchema } = require('../../../../schemas/zod/invoice');

// export validate general ledger id middleware
module.exports = (req, res, next) => {
    // validate request params
    const { error, success } = invoiceSchema
        .pick({ id: true })
        .safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
