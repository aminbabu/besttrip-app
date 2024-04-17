/**
 * @file /middlewares/validators/settings/site/meta/validate-meta-settings-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { metaSettingsSchema } = require('../../../../../schemas/zod/settings/site');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export meta settings validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { data, error, success } = metaSettingsSchema.pick({ id: true }).safeParse(req.params);

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
