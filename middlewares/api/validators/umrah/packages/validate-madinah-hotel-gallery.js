/**
 * @file
 * /middlewares/api/validators/umrah/extanets/validate-madinah-hotel-gallery.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const {
    DEFAULT_IMAGE_TYPES,
    ONE_MEGA_BYTE,
} = require('../../../../../constants');

// export umrah package madinah hotel gallery validator middleware
module.exports = async (req, res, next) => {
    try {
        // get madinah hotel extra thumbnails
        const { madinahHotelExtraThumbnails } = req.files || {};

        // check if madinah hotel extra thumbnails are not provided
        if (!madinahHotelExtraThumbnails) {
            return next();
        }

        // check if madinah hotel extra thumbnails is an array
        if (!Array.isArray(madinahHotelExtraThumbnails)) {
            return res.status(400).json({
                message: 'Please upload valid images for Madinah hotel.',
            });
        }

        // Validate each thumbnail
        for (const thumbnail of madinahHotelExtraThumbnails) {
            if (!thumbnail) continue;

            // Check if thumbnail is not an image of allowed types
            if (!DEFAULT_IMAGE_TYPES.includes(thumbnail.mimetype)) {
                return res.status(400).json({
                    message: `Please upload valid images for Madinah hotel of type ${DEFAULT_IMAGE_TYPES.join(
                        ', '
                    )}.`,
                });
            }

            // Check if image size is greater than 1 MB
            if (thumbnail.size > ONE_MEGA_BYTE) {
                return res.status(400).json({
                    message: `Please upload images for Madinah hotel of size less than ${(
                        ONE_MEGA_BYTE / ONE_MEGA_BYTE
                    ).toFixed(2)} MB.`,
                });
            }
        }

        // Proceed to next middleware if all checks pass
        return next();
    } catch (error) {
        console.error('Error validating Madinah hotel gallery:', error.message);
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
