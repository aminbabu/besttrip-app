/**
 * @file /middlewares/validators/settings/content/sections/validate-content-section-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { contentSectionsSettingsSchema } = require('../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export contentSections settings id validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = contentSectionsSettingsSchema
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
