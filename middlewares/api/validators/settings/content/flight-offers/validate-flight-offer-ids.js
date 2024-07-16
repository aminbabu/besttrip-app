/**
 * @file /middlewares/api/validators/settings/content/hotel-offers/validate-hotel-offer-ids.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 Jul, 2024
 * @update_date 17 Jul, 2024
 */

// dependencies
const { z } = require('zod');
const {
    flightOfferSchema,
} = require('../../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../../handlers/errors');

// Middleware function to validate hotel offer IDs
module.exports = (req, res, next) => {
    // Validate request body IDs against the schema
    const { error, data } = flightOfferSchema
        .pick({ ids: true })
        .safeParse(req.body.ids);

    // Check for validation errors
    if (error) {
        return zodErrorHandler(res, error);
    }

    // If validation succeeds, attach the transformed IDs to req.body
    req.body.ids = data;

    // Proceed to the next middleware
    next();
};
