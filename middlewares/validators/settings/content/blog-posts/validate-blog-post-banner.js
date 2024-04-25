/**
 * @file
 * /middlewares/validators/settings/content/blog-posts/validation-blog-post-banner.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 22 April, 2024
 */

const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE } = require('../../../../../constants');

// export blog post file validator middleware
module.exports = async (req, res, next) => {
    // get banner
    const { banner } = req.files || {};

    // check if banner is an array
    if (Array.isArray(banner)) {
        return res.status(400).json({
            message: 'Please upload only one banner',
        });
    }

    // check if banner is not an image of type jpg, jpeg, png
    if (banner && !DEFAULT_IMAGE_TYPES.includes(banner.mimetype)) {
        return res.status(400).json({
            message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(', ')}`,
        });
    }

    // check if banner size is greater than 1 MB
    if (banner?.size > ONE_MEGA_BYTE) {
        return res.status(400).json({
            message: `Please upload a banner of size less than ${(ONE_MEGA_BYTE / ONE_MEGA_BYTE).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
