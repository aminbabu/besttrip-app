/**
 * @file /middlewares/validation/umrah/packages/validate-madinah-hotel.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { umrahMadinahHotelSchema } = require('../../../../schemas/zod/umrah/packages');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export umrah madinah hotel validation middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahMadinahHotelSchema.safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
