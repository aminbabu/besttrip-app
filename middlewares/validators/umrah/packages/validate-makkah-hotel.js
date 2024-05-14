/**
 * @file /middlewares/validation/umrah/packages/validate-makkah-hotel.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { umrahMakkaHotelSchema } = require('../../../../schemas/zod/umrah/packages');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export umrah makkah hotel validation middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahMakkaHotelSchema.safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
