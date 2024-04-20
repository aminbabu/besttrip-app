/**
 * @file
 * /middlewares/validators/settings/content/blog-posts/validation-blog-post-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE } = require('../../../../../constants');

// export blog post file validator middleware
module.exports = async (req, res, next) => {
    // get thumbnail
    const { thumbnail } = req.files;

    // check if thumbnail is an array
    if (Array.isArray(thumbnail)) {
        return res.status(400).json({
            message: 'Please upload only one thumbnail',
        });
    }

    // check if thumbnail is not an image of type jpg, jpeg, png
    if (thumbnail && !DEFAULT_IMAGE_TYPES.includes(thumbnail.mimetype)) {
        return res.status(400).json({
            message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
        });
    }

    // check if thumbnail size is greater than 1 MB
    if (thumbnail?.size > ONE_MEGA_BYTE) {
        return res.status(400).json({
            message: `Please upload a thumbnail of size less than ${(ONE_MEGA_BYTE / ONE_MEGA_BYTE).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
