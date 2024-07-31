/**
 * @file /middlewares/api/validators/umrah/bookings/validate-umrah-booking-ids.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 31 July, 2024
 * @update_date 31 July, 2024
 */

// dependencies
const { z } = require('zod');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export validate umrah booking IDs validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = bookingIdsSchema
        .pick({ ids: true })
        .safeParse(req.body.ids);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
