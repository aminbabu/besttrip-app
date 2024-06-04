/**
 * @file /middlewares/validation/umrah/packages/validate-terms-and-conditions.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 15 May, 2024
 */

// dependencies
const { termsAndConditionsSchema } = require('../../../../../schemas/zod/umrah/packages');
const { zodErrorHandler } = require('../../../../../handlers/api/errors');
const { filterReqFromZodSchema } = require('../../../../../utils/umrah/package');

// export umrah terms and conditions validation middleware
module.exports = (req, res, next) => {
    // filter request body object according to schema
    const data = filterReqFromZodSchema(req.body, termsAndConditionsSchema.shape);

    // validate request body
    const { error, success } = termsAndConditionsSchema.safeParse(data);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
