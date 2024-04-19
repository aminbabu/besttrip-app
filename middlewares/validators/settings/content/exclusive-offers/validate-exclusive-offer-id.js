/**
 * @file /middlewares/validators/settings/content/exclusive-offers/validate-exclusive-offer-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { contentExclusiveOffersSchema } = require('../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../handlers/errors');

// export exclusive offer id validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = contentExclusiveOffersSchema.pick({ id: true }).safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
