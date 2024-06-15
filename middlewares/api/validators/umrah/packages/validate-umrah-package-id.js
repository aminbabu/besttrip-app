/**
 * @file /middlewares/api/validators/umrah/packages/validate-umrah-package-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { umrahPackageIdSchema } = require('../../../../../schemas/zod/umrah/packages');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export umrah package id validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahPackageIdSchema.safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
