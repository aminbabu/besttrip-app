/**
 * @file /middlewares/api/validators/settings/themes/validate-theme-settings-file.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

const {
    DEFAULT_IMAGE_TYPES,
    ONE_MEGA_BYTE,
    DEFAULT_FILE_SIZE,
} = require('../../../../../constants');

// export theme settings file validator middleware
module.exports = async (req, res, next) => {
    try {
        // get illustration from request files
        const { illustration } = req.files || {};

        // check if illustration is not provided
        if (!illustration) {
            return res.status(400).json({
                message: 'Illustration is required.',
            });
        }

        // check if illustration is an array
        if (Array.isArray(illustration)) {
            return res.status(400).json({
                message: 'Illustration must be a single image.',
            });
        }

        // check if illustration is not an image of allowed types
        if (
            illustration &&
            ![...DEFAULT_IMAGE_TYPES, 'image/svg+xml'].includes(
                illustration.mimetype
            )
        ) {
            return res.status(400).json({
                message: `Illustration must be of type ${[
                    ...DEFAULT_IMAGE_TYPES,
                    'image/svg+xml',
                ].join(', ')}.`,
            });
        }

        // check if illustration size is greater than allowed size
        if (illustration?.size > DEFAULT_FILE_SIZE) {
            return res.status(400).json({
                message: `Illustration size must be less than ${(
                    DEFAULT_FILE_SIZE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        return next();
    } catch (error) {
        console.error('Error validating theme settings file:', error.message);
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
