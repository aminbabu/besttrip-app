/**
 * @file /middlewares/validators/settings/site/policies/validate-policy-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { policySettingsSchema } = require('../../../../../schemas/zod/settings/site');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export site policies settings validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = policySettingsSchema.safeParse(req.body);

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
