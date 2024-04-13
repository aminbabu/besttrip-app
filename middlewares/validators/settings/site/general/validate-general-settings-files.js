/**
 * @file /middlewares/validators/settings/site/general/validate-general-settings-files.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

const {
    BRAND_LOGO_TYPES,
    FAVICON_TYPES,
    ONE_MEGA_BYTE,
    HALF_MEGA_BYTE,
} = require('../../../../../constants');

// export general site settings files validator middleware
module.exports = async (req, res, next) => {
    // get logo and favicon files
    const { logo, favicon } = req.files;

    // check if logo/favicon is an array
    if (Array.isArray(logo) || Array.isArray(favicon)) {
        return res.status(400).json({
            message: 'Please upload a valid image',
        });
    }

    // check if logo is not an image of type jpeg, jpg, png
    if (logo && !BRAND_LOGO_TYPES.includes(logo.mimetype)) {
        return res.status(400).json({
            message: `Please upload a logo of type ${BRAND_LOGO_TYPES.join(', ')}`,
        });
    }

    // check if favicon is not an image of type png, ico, svg
    if (favicon && !FAVICON_TYPES.includes(favicon.mimetype)) {
        return res.status(400).json({
            message: `Please upload a favicon of type ${FAVICON_TYPES.join(', ')}`,
        });
    }

    // check if logo/favicon size is greater than 0.5 MB
    if (logo.size > HALF_MEGA_BYTE || favicon.size > HALF_MEGA_BYTE) {
        return res.status(400).json({
            message: `Please upload a logo/favicon of size less than ${(HALF_MEGA_BYTE / ONE_MEGA_BYTE).toFixed(2)} MB`,
        });
    }

    // continue to next middleware
    return next();
};
