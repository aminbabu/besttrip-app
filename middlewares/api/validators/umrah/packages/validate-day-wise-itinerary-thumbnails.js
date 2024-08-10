/**
 * @file /middlewares/api/validators/umrah/extanets/validate-day-wise-itinerary-thumbnails.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const {
    DEFAULT_IMAGE_TYPES,
    DEFAULT_FILE_SIZE,
    ONE_MEGA_BYTE,
} = require('../../../../../constants');

// export umrah day wise itinerary thumbnails validator
module.exports = async (req, res, next) => {
    try {
        // get day wise itinerary thumbnails from request
        let { itineraryDays } = req.body || {};

        // check if day wise itinerary thumbnails are not provided
        if (!itineraryDays) {
            return next();
        }

        // Validate each itinerary thumbnail
        for (const itinerary of itineraryDays) {
            if (!itinerary.thumbnail) {
                continue;
            }

            // Check if thumbnail is not an image of allowed types
            if (!DEFAULT_IMAGE_TYPES.includes(itinerary.thumbnail.mimetype)) {
                return res.status(400).json({
                    message: `Please upload day wise itinerary images of type ${DEFAULT_IMAGE_TYPES.join(
                        ', '
                    )}.`,
                });
            }

            // Check if image size is greater than 1 MB
            if (itinerary.thumbnail.size > DEFAULT_FILE_SIZE) {
                return res.status(400).json({
                    message: `Please upload day wise itinerary images of size less than ${(
                        DEFAULT_FILE_SIZE / ONE_MEGA_BYTE
                    ).toFixed(2)} MB.`,
                });
            }
        }

        // Proceed to next middleware if all checks pass
        return next();
    } catch (error) {
        console.error(
            'Error validating day wise itinerary thumbnails:',
            error.message
        );
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
