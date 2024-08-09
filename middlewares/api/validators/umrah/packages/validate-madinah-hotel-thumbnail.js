/**
 * @file
 * /middlewares/api/validators/umrah/packages/validate-madinah-hotel-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 15 May, 2024
 */

// dependencies
const {
    DEFAULT_IMAGE_TYPES,
    DEFAULT_FILE_SIZE,
    ONE_MEGA_BYTE,
} = require('../../../../../constants');

// export umrah package madinah hotel thumbnail validator middleware
module.exports = async (req, res, next) => {
    try {
        // get madinah hotel thumbnail
        const { madinahHotelThumbnail } = req.files || {};

        // check if madinah hotel thumbnail is not provided
        if (!madinahHotelThumbnail) {
            return res.status(400).json({
                message: 'Please upload a thumbnail for Madinah hotel.',
            });
        }

        // check if madinah hotel thumbnail is an array
        if (Array.isArray(madinahHotelThumbnail)) {
            return res.status(400).json({
                message: 'Please upload only one thumbnail for Madinah hotel.',
            });
        }

        // check if madinah hotel thumbnail is not an image of allowed types
        if (!DEFAULT_IMAGE_TYPES.includes(madinahHotelThumbnail.mimetype)) {
            return res.status(400).json({
                message: `Please upload a valid thumbnail for Madinah hotel of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        // check if madinah hotel thumbnail size is greater than 5 MB
        if (madinahHotelThumbnail.size > DEFAULT_FILE_SIZE) {
            return res.status(400).json({
                message: `Please upload a thumbnail for Madinah hotel of size less than ${(
                    DEFAULT_FILE_SIZE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware if all checks pass
        return next();
    } catch (error) {
        console.error(
            'Error validating Madinah hotel thumbnail:',
            error.message
        );
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
