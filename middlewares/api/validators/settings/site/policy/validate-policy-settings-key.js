/**
 * @file /middlewares/api/validators/settings/site/policy/validate-policy-settings-key.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { policySettingsSchema } = require('../../../../../../schemas/zod/settings/site');
const { zodErrorHandler } = require('../../../../../../handlers/api/errors');

// export site policy settings validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = policySettingsSchema.pick({ key: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
