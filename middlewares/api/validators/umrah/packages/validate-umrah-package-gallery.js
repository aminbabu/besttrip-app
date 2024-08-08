/**
 * @file
 * /middlewares/api/validators/umrah/extanets/validate-umrah-package-gallery.js
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

// export umrah package extra thumbnails validator middleware
module.exports = async (req, res, next) => {
    try {
        // get extra thumbnails
        const { extraThumbnails } = req.files || {};

        // check if extra thumbnails is not provided
        if (!extraThumbnails) {
            return next();
        }

        // check if extra thumbnails is not an array
        if (!Array.isArray(extraThumbnails)) {
            return res.status(400).json({
                message: 'Extra thumbnails must be an array of images.',
            });
        }

        // check if there are invalid image types or sizes
        let isInvalidImageType = false;
        let isInvalidImageSize = false;

        extraThumbnails.forEach((thumbnail) => {
            // check if thumbnail is not an image of allowed types
            if (!DEFAULT_IMAGE_TYPES.includes(thumbnail.mimetype)) {
                isInvalidImageType = true;
            }

            // check if thumbnail size exceeds 1 MB
            if (thumbnail.size > ONE_MEGA_BYTE) {
                isInvalidImageSize = true;
            }
        });

        // respond with errors if any
        if (isInvalidImageType) {
            return res.status(400).json({
                message: `Please upload extra thumbnails of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        if (isInvalidImageSize) {
            return res.status(400).json({
                message: `Please upload extra thumbnails of size less than ${(
                    ONE_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        return next();
    } catch (error) {
        console.error('Error validating Umrah package gallery:', error.message);
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
