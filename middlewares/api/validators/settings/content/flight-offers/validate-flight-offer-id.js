/**
 * @file /middlewares/api/validators/settings/content/flight-offers/validate-flight-offer-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { flightOfferSchema } = require('../../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../../handlers/api/errors');

// export flight offer id validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = flightOfferSchema.pick({ id: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
