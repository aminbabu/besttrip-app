/**
 * @file /middlewares/api/validators/settings/content/sections/validate-content-section.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { sectionSettingsSchema } = require('../../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../../handlers/api/errors');

// export payments settings validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = sectionSettingsSchema.safeParse({
        ...req.params,
        ...req.body,
    });

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
