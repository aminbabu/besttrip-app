/**
 * @file /middlewares/api/validators/settings/content/exclusive-offers/validate-exclusive-offer-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 06 May, 2024
 */

// dependencies
const { exclusiveOfferSchema } = require('../../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../../handlers/api/errors');

// export exclusive offer id validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = exclusiveOfferSchema.pick({ id: true }).safeParse(req.params);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
