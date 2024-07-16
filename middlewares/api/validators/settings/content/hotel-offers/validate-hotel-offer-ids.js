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
const { ObjectId } = require('mongodb'); // Assuming MongoDB ObjectId
const { zodErrorHandler } = require('../../../../../../handlers/errors');

// Function to convert string to MongoDB ObjectId
const toObjectId = (id) => {
    try {
        return new ObjectId(id);
    } catch (error) {
        throw new Error('Please provide valid MongoDB IDs');
    }
};

// Zod schema for validating and transforming IDs
const hotelOfferIdsSchema = z
    .array(
        z.string({
            required_error: 'IDs are required',
            invalid_type_error: 'Please provide valid IDs',
        })
    )
    .nonempty({
        message: 'IDs array must not be empty',
    })
    .transform((ids) => ids.map(toObjectId));

// Middleware function to validate hotel offer IDs
module.exports = (req, res, next) => {
    // Validate request body IDs against the schema
    const { error, data } = hotelOfferIdsSchema.safeParse(req.body.ids);

    // Check for validation errors
    if (error) {
        return zodErrorHandler(res, error);
    }

    // If validation succeeds, attach the transformed IDs to req.body
    req.body.ids = data;

    // Proceed to the next middleware
    next();
};
