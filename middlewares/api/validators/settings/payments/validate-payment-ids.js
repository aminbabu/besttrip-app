/**
 * @file /middlewares/api/validators/settings/payments/validate-payments-ids.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const {
    paymentSettingsSchema,
} = require('../../../../../schemas/zod/settings/payments');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export umrah offer id validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = paymentSettingsSchema
        .pick({ ids: true })
        .safeParse(req.body.ids);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
