/**
 * @file
 * /middlewares/api/validators/umrah/extanets/validate-makkah-hotel-gallery.js
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

// export umrah package makkah hotel gallery validator middleware
module.exports = async (req, res, next) => {
    try {
        let isInValidImageType = false;
        let isInValidImageSize = false;

        // get makkah hotel extra thumbnails
        const { makkahHotelExtraThumbnails } = req.files || {};

        // check if makkah hotel extra thumbnails is not provided
        if (!makkahHotelExtraThumbnails) {
            return next();
        }

        // check if makkah hotel extra thumbnails is an array
        if (!Array.isArray(makkahHotelExtraThumbnails)) {
            return res.status(400).json({
                message:
                    'Please upload valid images for the Makkah hotel gallery.',
            });
        }

        // Check each extra thumbnail
        makkahHotelExtraThumbnails.forEach((thumbnail) => {
            // Check if thumbnail is not an image of allowed types
            if (!DEFAULT_IMAGE_TYPES.includes(thumbnail.mimetype)) {
                isInValidImageType = true;
            }

            // Check if image size is greater than 1 MB
            if (thumbnail.size > ONE_MEGA_BYTE) {
                isInValidImageSize = true;
            }
        });

        // Check if there are invalid image types
        if (isInValidImageType) {
            return res.status(400).json({
                message: `Please upload valid images for the Makkah hotel gallery of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        // Check if there are invalid image sizes
        if (isInValidImageSize) {
            return res.status(400).json({
                message: `Please upload images for the Makkah hotel gallery of size less than ${(
                    ONE_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // Proceed to next middleware if all checks pass
        return next();
    } catch (error) {
        console.error(
            'Error validating Makkah hotel gallery images:',
            error.message
        );
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
