/**
 * @file middlewares/validators/global/validate-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 22 April, 2024
 */

// dependencies
const {
    DEFAULT_IMAGE_TYPES,
    HALF_MEGA_BYTE,
    ONE_MEGA_BYTE,
} = require('../../../../constants');

// export validate avatar middleware
module.exports = (req, res, next) => {
    try {
        // get avatar file
        const { avatar } = req.files || {};

        // check if file is not provided
        if (!avatar) {
            return res.status(400).json({
                message: 'No file uploaded. Please upload an image.',
            });
        }

        // check if file is an array (should be a single file)
        if (Array.isArray(avatar)) {
            return res.status(400).json({
                message: 'Please upload a single image file.',
            });
        }

        // check if file is an image of the allowed types
        if (!DEFAULT_IMAGE_TYPES.includes(avatar.mimetype)) {
            return res.status(400).json({
                message: `Invalid file type. Please upload an image of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        // check if file size is within the allowed limit (e.g., 0.5 MB)
        if (avatar.size > HALF_MEGA_BYTE) {
            return res.status(400).json({
                message: `File size exceeds the limit. Please upload an image smaller than ${(
                    HALF_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        next();
    } catch (error) {
        console.error('Error validating avatar:', error.message);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
