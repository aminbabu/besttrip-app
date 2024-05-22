/**
 * @file /middlewares/validation/umrah/package-durations/validate-umrah-package-duration.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const {
    umrahPackageDurationSchema,
} = require('../../../../../schemas/zod/umrah/package-durations');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export umrah package duration validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahPackageDurationSchema.omit({ id: true }).safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
