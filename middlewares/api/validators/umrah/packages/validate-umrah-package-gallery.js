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
    let isInValidImageType = false;
    let isInValidImageSize = false;

    // get extra thumbnails
    const { extraThumbnails } = req.files || {};

    // check if extra thumbnails is not provided
    if (!extraThumbnails) {
        return next();
    }

    // Check if extra thumbnails is not an array
    if (!Array.isArray(extraThumbnails)) {
        return res.status(200).json({
            message: 'Please upload valid extra thumbnails images',
        });
    }

    // Check each extra thumbnail
    extraThumbnails.forEach((thumbnail) => {
        // Check if thumbnail is not an image of type jpg, jpeg, png
        if (!DEFAULT_IMAGE_TYPES.includes(thumbnail.mimetype)) {
            isInValidImageType = true;
        }

        // Check if image size is greater than 1 MB
        if (thumbnail.size > ONE_MEGA_BYTE) {
            isInValidImageSize = true;
        }

        // Add return statement at the end of the arrow function
        return null;
    });

    // Check if all checks pass
    if (isInValidImageType) {
        return res.status(200).json({
            message: `Please upload valid extra thumbnails images of type ${DEFAULT_IMAGE_TYPES.join(
                ', '
            )}`,
        });
    }

    if (isInValidImageSize) {
        return res.status(200).json({
            message: `Please upload extra thumbnails images of size less than ${(
                ONE_MEGA_BYTE / ONE_MEGA_BYTE
            ).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
