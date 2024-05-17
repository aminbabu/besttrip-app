/**
 * @file /middlewares/validation/umrah/extanets/validate-day-wise-itinerary-thumbnails.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE } = require('../../../../constants');

// export umrah day wise itinerary thumbnails validator
module.exports = async (req, res, next) => {
    let isThumbnailArray = false;
    let isInValidImageType = false;
    let isInValidImageSize = false;

    // get day wise itinerary thumbnails from request
    const { itineraryDays } = req.files || {};

    // check if day wise itinerary thumbnails is not provided
    if (!itineraryDays?.length) {
        return next();
    }

    // Check each itinerary thumbnail
    itineraryDays.forEach((itinerary) => {
        // Check if thumbnail is not an array
        if (Array.isArray(itinerary?.thumbnail)) {
            isThumbnailArray = true;
        }

        // Check if thumbnail is not an image of type jpg, jpeg, png
        if (!DEFAULT_IMAGE_TYPES.includes(itinerary?.thumbnail.mimetype)) {
            isInValidImageType = true;
        }

        // Check if image size is greater than 1 MB
        if (itinerary?.thumbnail.size > ONE_MEGA_BYTE) {
            isInValidImageSize = true;
        }

        // Add return statement at the end of the arrow function
        return null;
    });

    // Check if all checks pass
    if (isThumbnailArray) {
        return res.status(400).json({
            message: 'Please upload valid day wise itinerary images.',
        });
    }

    if (isInValidImageType) {
        return res.status(400).json({
            message: `Please upload valid day wise itinerary images of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
        });
    }

    if (isInValidImageSize) {
        return res.status(400).json({
            message: `Please upload day wise itinerary images of size less than ${(
                ONE_MEGA_BYTE / ONE_MEGA_BYTE
            ).toFixed(2)} MB`,
        });
    }

    // Proceed to next middleware if all checks pass
    return next();
};
