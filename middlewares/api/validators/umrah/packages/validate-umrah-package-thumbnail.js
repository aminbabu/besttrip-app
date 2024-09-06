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
    try {
        // get thumbnail
        const { thumbnail } = req.files || {};

        if (req.method === 'PATCH' && !thumbnail) {
            return next();
        }

        // check if thumbnail is not provided
        if (!thumbnail) {
            return res.status(400).json({
                message: 'Please upload a thumbnail.',
            });
        }

        // check if thumbnail is an array
        if (Array.isArray(thumbnail)) {
            return res.status(400).json({
                message: 'Please upload only one thumbnail.',
            });
        }

        // check if thumbnail is not an image of the allowed types
        if (!DEFAULT_IMAGE_TYPES.includes(thumbnail.mimetype)) {
            return res.status(400).json({
                message: `Please upload a thumbnail of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        // check if thumbnail size exceeds 5 MB
        if (thumbnail.size > DEFAULT_FILE_SIZE) {
            return res.status(400).json({
                message: `Please upload a thumbnail of size less than ${(
                    DEFAULT_FILE_SIZE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        return next();
    } catch (error) {
        console.error(
            'Error validating Umrah package thumbnail:',
            error.message
        );
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
