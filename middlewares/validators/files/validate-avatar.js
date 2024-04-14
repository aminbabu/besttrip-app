/**
 * @file middlewares/validators/global/validate-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { DEFAULT_IMAGE_TYPES, HALF_MEGA_BYTE, ONE_MEGA_BYTE } = require('../../../constants');

// export validate avatar middleware
module.exports = (req, res, next) => {
    // get avatar file
    const { avatar } = req.files;

    // check if file is an array
    if (avatar && Array.isArray(avatar)) {
        return res.status(400).json({
            message: 'Please upload a valid image',
        });
    }

    // check if file is not an image of type jpeg, jpg, png
    if (avatar && !DEFAULT_IMAGE_TYPES.includes(avatar.mimetype)) {
        return res.status(400).json({
            message: `Please upload an image of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
        });
    }

    // check if file size is greater than 0.5 MB
    if (avatar && avatar.size > HALF_MEGA_BYTE) {
        return res.status(400).json({
            message: `Please upload an image of size less than ${(HALF_MEGA_BYTE / ONE_MEGA_BYTE).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
