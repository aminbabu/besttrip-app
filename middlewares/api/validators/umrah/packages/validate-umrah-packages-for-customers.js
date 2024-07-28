/**
 * @file /middlewares/api/validators/umrah/packages/get-umrah-packages-for-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 15 May, 2024
 */

// dependencies
const {
    umrahPackagesForCustomersSchema,
} = require('../../../../../schemas/zod/umrah/packages');
const { zodErrorHandler } = require('../../../../../handlers/errors');
const {
    filterReqFromZodSchema,
} = require('../../../../../utils/umrah/package');

// export umrah package validator middleware
module.exports = (req, res, next) => {
    // filter request body object according to schema
    const data = filterReqFromZodSchema(
        req.body,
        umrahPackagesForCustomersSchema.shape
    );

    // validate request body
    const { error, success } = umrahPackagesForCustomersSchema.safeParse(data);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
