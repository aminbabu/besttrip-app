/**
 * @file
 * /middlewares/api/validators/umrah/packages/validate-makkah-hotel-thumbnail.js
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

// export umrah package makkah hotel thumbnail validator middleware
module.exports = async (req, res, next) => {
    try {
        // get makkah hotel thumbnail
        const { makkahHotelThumbnail } = req.files || {};

        // check if makkah hotel thumbnail is not provided
        if (!makkahHotelThumbnail) {
            return res.status(400).json({
                message: 'Please upload a thumbnail for the Makkah hotel.',
            });
        }

        // check if makkah hotel thumbnail is an array
        if (Array.isArray(makkahHotelThumbnail)) {
            return res.status(400).json({
                message:
                    'Please upload only one thumbnail for the Makkah hotel.',
            });
        }

        // check if makkah hotel thumbnail is not an image of allowed types
        if (
            makkahHotelThumbnail &&
            !DEFAULT_IMAGE_TYPES.includes(makkahHotelThumbnail.mimetype)
        ) {
            return res.status(400).json({
                message: `Please upload a thumbnail of the Makkah hotel of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        // check if makkah hotel thumbnail size is greater than 5 MB
        if (makkahHotelThumbnail?.size > DEFAULT_FILE_SIZE) {
            return res.status(400).json({
                message: `Please upload a thumbnail of the Makkah hotel that is less than ${(
                    DEFAULT_FILE_SIZE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        return next();
    } catch (error) {
        console.error(
            'Error validating Makkah hotel thumbnail:',
            error.message
        );
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
