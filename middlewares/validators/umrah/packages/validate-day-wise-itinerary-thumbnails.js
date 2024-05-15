/**
 * @file
 * /middlewares/validation/umrah/extanets/validate-day-wise-itinerary-thumbnails.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 May, 2024
 * @update_date 15 May, 2024
 */

// dependencies
const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE } = require('../../../../constants');

// export umrah day wise itinerary thumbnails validator
module.exports = async (req, res, next) => {
    // get day wise itinerary thumbnails from request
    const { itineraryDays } = req.files || {};

    // check if day wise itinerary thumbnails is not provided
    if (!itineraryDays?.length) {
        return next();
    }

    // check if day wise itenerary thumbnail is not an image of type jpg, jpeg, png
    itineraryDays.forEach(
        (image) =>
            !DEFAULT_IMAGE_TYPES.includes(image.mimetype) &&
            res.status(400).json({
                message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
            })
    );

    // check if each image size is greater than 1 MB
    itineraryDays.forEach(
        (image) =>
            image.size > ONE_MEGA_BYTE &&
            res.status(400).json({
                message: `Please upload images of size less than ${(ONE_MEGA_BYTE / ONE_MEGA_BYTE).toFixed(2)} MB`,
            })
    );

    // proceed to next middleware
    return next();
};
