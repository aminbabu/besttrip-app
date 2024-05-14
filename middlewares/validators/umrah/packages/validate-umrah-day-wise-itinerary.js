/**
 * @file /middlewares/validation/umrah/packages/validate-umrah-day-wise-itinerary.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { umrahDayWiseItinerarySchema } = require('../../../../schemas/zod/umrah/packages');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export umrah day wise itinerary validation middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahDayWiseItinerarySchema.safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
