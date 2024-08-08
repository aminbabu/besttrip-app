/**
 * @file
 * /middlewares/api/validators/settings/content/blog-posts/validation-blog-post-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const {
    DEFAULT_IMAGE_TYPES,
    ONE_MEGA_BYTE,
} = require('../../../../../../constants');

// export blog post file validator middleware
module.exports = async (req, res, next) => {
    try {
        // get thumbnail
        const { thumbnail } = req.files || {};

        // check if the req method is not POST and no thumbnail is provided
        if (req.method !== 'POST' && !thumbnail) {
            return next();
        }

        // check if thumbnail is not uploaded
        if (!thumbnail) {
            return res.status(400).json({
                message: 'No thumbnail uploaded. Please upload a thumbnail.',
            });
        }

        // check if thumbnail is an array
        if (Array.isArray(thumbnail)) {
            return res.status(400).json({
                message: 'Please upload only one thumbnail.',
            });
        }

        // check if thumbnail is an image of the allowed types
        if (!DEFAULT_IMAGE_TYPES.includes(thumbnail.mimetype)) {
            return res.status(400).json({
                message: `Invalid file type. Please upload an image of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        // check if thumbnail size is within the allowed limit (e.g., 1 MB)
        if (thumbnail.size > ONE_MEGA_BYTE) {
            return res.status(400).json({
                message: `File size exceeds the limit. Please upload a thumbnail smaller than ${(
                    ONE_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        return next();
    } catch (error) {
        console.error('Error validating blog post thumbnail:', error.message);
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
