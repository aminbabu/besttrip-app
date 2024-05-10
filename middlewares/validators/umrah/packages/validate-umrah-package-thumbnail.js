/**
 * @file
 * /middlewares/validation/umrah/packages/validate-umrah-package-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 10 May, 2024
 */

// dependencies
const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE } = require('../../../../constants');

// export umrah package package thumbnail validator middleware
module.exports = async (req, res, next) => {
    // get umrah package thumbnail
    const { umrahThumbnail } = req.files || {};

    // check if umrah thumbnail is not provided
    if (!umrahThumbnail) {
        return res.status(400).json({
            message: 'Please upload a thumbnail',
        });
    }

    // check if makka hotel thumbnail is an array
    if (Array.isArray(umrahThumbnail)) {
        return res.status(400).json({
            message: 'Please upload only one thumbnail',
        });
    }

    // check if umrah thumbnail is not an image of type jpg, jpeg, png
    if (umrahThumbnail && !DEFAULT_IMAGE_TYPES.includes(umrahThumbnail.mimetype)) {
        return res.status(400).json({
            message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
        });
    }

    // check if umrah thumbnail size is greater than 1 MB
    if (umrahThumbnail?.size > ONE_MEGA_BYTE) {
        return res.status(400).json({
            message: `Please upload a thumbnail of size less than ${(ONE_MEGA_BYTE / ONE_MEGA_BYTE).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
