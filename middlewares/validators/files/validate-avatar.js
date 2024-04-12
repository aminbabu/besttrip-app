/**
 * @file middlewares/validators/global/validate-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 12 April, 2024
 */

// dependencies
const { DEFAULT_IMAGE_TYPES, HALF_MEGA_BYTE, ONE_MEGA_BYTE } = require('../../../constants');

// export validate avatar middleware
module.exports = (req, res, next) => {
    // check if file is not uploaded
    if (!req.files || !req.files.avatar) {
        return res.status(400).json({
            message: 'Please upload an avatar',
        });
    }

    // check if file is not an array
    if (!Array.isArray(req.files.avatar)) {
        return res.status(400).json({
            message: 'Please upload an avatar',
        });
    }

    // check if file is not an image of type jpeg, jpg, png
    if (!DEFAULT_IMAGE_TYPES.includes(req.files.avatar.mimetype)) {
        return res.status(400).json({
            message: `Please upload an image of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
        });
    }

    // check if file size is greater than 5MB
    if (req.files.avatar.size > HALF_MEGA_BYTE) {
        return res.status(400).json({
            message: `Please upload an image of size less than ${(HALF_MEGA_BYTE / ONE_MEGA_BYTE).toFixed(2)} MB`,
        });
    }

    // continue to next middleware
    return next();
};
