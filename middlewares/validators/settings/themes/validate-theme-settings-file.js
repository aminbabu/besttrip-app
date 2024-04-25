/**
 * @file /middlewares/validators/settings/themes/validate-theme-settings-file.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 22 April, 2024
 */

const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE, DEFAULT_FILE_SIZE } = require('../../../../constants');

// export theme settings file validator middleware
module.exports = async (req, res, next) => {
    // get illustration from request body
    const { illustration } = req.files || {};

    // check if illustration is an array
    if (Array.isArray(illustration)) {
        return res.status(400).json({
            message: 'Illustration must be a single image',
        });
    }

    // check if illustration is not an image of type jpg, jpeg, png
    if (illustration && !DEFAULT_IMAGE_TYPES.includes(illustration.mimetype)) {
        return res.status(400).json({
            message: `Illustration must be of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
        });
    }

    // check if illustration is of size greater than 5MB
    if (illustration?.size > DEFAULT_FILE_SIZE) {
        return res.status(400).json({
            message: `Illustration must be of size less than ${(DEFAULT_FILE_SIZE / ONE_MEGA_BYTE).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
