/**
 * @file /middlewares/api/validators/settings/payments/validate-payments-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { paymentSettingsSchema } = require('../../../../../schemas/zod/settings/payments');
const { zodErrorHandler } = require('../../../../../handlers/api/errors');

// export payments settings validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = paymentSettingsSchema.omit({ id: true }).safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
