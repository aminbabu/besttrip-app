/**
 * @file
 * /middlewares/validation/umrah/extanets/validate-makkah-hotel-gallery.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 15 May, 2024
 */

// dependencies
const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE } = require('../../../../constants');

// export umrah package makkah hotel gallery validator middleware
module.exports = async (req, res, next) => {
    // get makkah hotel extra thumbnails
    const { makkahHotelExtraThumbnails } = req.files || {};

    // check if makka hotel extra thumbnails is not an array
    if (!makkahHotelExtraThumbnails?.length) {
        return next();
    }

    // check if makka hotel extra thumbnails is not an image of type jpg, jpeg, png
    makkahHotelExtraThumbnails.forEach(
        (image) =>
            !DEFAULT_IMAGE_TYPES.includes(image.mimetype) &&
            res.status(400).json({
                message: `Please upload valid images of makka hotel of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
            })
    );

    // check if each image size is greater than 1 MB
    makkahHotelExtraThumbnails.forEach(
        (image) =>
            image.size > ONE_MEGA_BYTE &&
            res.status(400).json({
                message: `Please upload images of makka hotel of size less than ${(
                    ONE_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB`,
            })
    );

    // proceed to next middleware
    return next();
};
