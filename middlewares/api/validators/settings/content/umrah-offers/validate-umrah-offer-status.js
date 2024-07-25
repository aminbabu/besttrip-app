/**
 * @file /middlewares/api/validators/settings/content/umrah-offers/validate-umrah-offer-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 Jul, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const {
    umrahOfferSchema,
} = require('../../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../../handlers/errors');

// export umrah offer status validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahOfferSchema
        .pick({ status: true })
        .safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
