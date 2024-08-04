/**
 * @file /middlewares/api/validators/umrah/bookings/validate-traveler-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { zodErrorHandler } = require('../../../../../handlers/errors');
const { travelersSchema } = require('../../../../../schemas/zod/travelers');

// export traveler id validator
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = travelersSchema
        .pick({ id: true })
        .safeParse({ id: req.params.travelerId });

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
