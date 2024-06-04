/**
 * @file /middlewares/api/validators/settings/site/general/validate-general-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { generalSettingsSchema } = require('../../../../../../schemas/zod/settings/site');
const { zodErrorHandler } = require('../../../../../../handlers/api/errors');

// export general settings validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = generalSettingsSchema.safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
