/**
 * @file /middlewares/api/validators/settings/themes/validate-theme-settings-key.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { themeSettingsSchema } = require('../../../../../schemas/zod/settings/themes');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export theme settings key validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = themeSettingsSchema.pick({ theme: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
