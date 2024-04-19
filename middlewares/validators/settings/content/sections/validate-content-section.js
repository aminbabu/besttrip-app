/**
 * @file /middlewares/validators/settings/payments/validate-payments-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 18 April, 2024
 */

// dependencies
const { contentSectionsSettingsSchema } = require('../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export payments settings validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = contentSectionsSettingsSchema
        .omit({ id: true })
        .safeParse(req.body);

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
