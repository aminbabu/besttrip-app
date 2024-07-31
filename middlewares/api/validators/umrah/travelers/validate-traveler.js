/**
 * @file /middlewares/api/validators/umrah/bookings/validate-umrah-booking.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { zodErrorHandler } = require('../../../../../handlers/errors');
const { travelersSchema } = require('../../../../../schemas/zod/travelers');

// export umrah package duration validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = travelersSchema
        .omit({ id: true, ids: true })
        .safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
