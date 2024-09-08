/**
 * @file
 * /middlewares/api/validators/umrah/packages/validate-umrah-package-thumbnail.js
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

// export umrah package thumbnail validator middleware
module.exports = async (req, res, next) => {
    // get umrah package thumbnail
    const { umrahThumbnail } = req.files || {};

    if (req.method === 'PATCH' && !umrahThumbnail) {
        return next();
    }

    // check if umrah thumbnail is not provided
    if (!umrahThumbnail) {
        return res.status(400).json({
            message: 'Please upload a thumbnail of umrah package',
        });
    }

    // check if umrah thumbnail is an array
    if (Array.isArray(umrahThumbnail)) {
        return res.status(400).json({
            message: 'Please upload only one thumbnail of umrah package',
        });
    }

    // check if umrah thumbnail is not an image of type jpg, jpeg, png
    if (
        umrahThumbnail &&
        !DEFAULT_IMAGE_TYPES.includes(umrahThumbnail.mimetype)
    ) {
        return res.status(400).json({
            message: `Please upload a thumbnail of umrah package of type ${DEFAULT_IMAGE_TYPES.join(
                ', '
            )}`,
        });
    }

    // check if umrah thumbnail size is greater than 5 MB
    if (umrahThumbnail?.size > DEFAULT_FILE_SIZE) {
        return res.status(400).json({
            message: `Please upload a thumbnail of umrah package of size less than ${(
                DEFAULT_FILE_SIZE / ONE_MEGA_BYTE
            ).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
