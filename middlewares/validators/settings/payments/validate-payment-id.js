/**
 * @file /middlewares/validators/settings/payments/validate-payments-settings-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { paymentsSettingsSchema } = require('../../../../schemas/zod/settings/payments');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export payments settings id validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = paymentsSettingsSchema
        .pick({ id: true })
        .safeParse(req.params);

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
