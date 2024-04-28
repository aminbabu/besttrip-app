/**
 * @file /middlewares/validation/umrah/package-types/validate-umrah-package-type-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { umrahPackageTypeSchema } = require('../../../../schemas/zod/umrah/package-types');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export umrah package type id validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahPackageTypeSchema.pick({ id: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
