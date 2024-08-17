/**
 * @file /middlewares/api/validators/umrah/packages/validate-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 15 May, 2024
 */

// dependencies
const {
    umrahPackageSchema,
} = require('../../../../../schemas/zod/umrah/packages');
const { zodErrorHandler } = require('../../../../../handlers/errors');
const {
    filterReqFromZodSchema,
} = require('../../../../../utils/umrah/package');

// export umrah package validator middleware
module.exports = (req, res, next) => {
    // filter request body object according to schema
    const data = filterReqFromZodSchema(req.body, umrahPackageSchema.shape);

    // validate request body
    const { error, success } = umrahPackageSchema.safeParse(data);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
