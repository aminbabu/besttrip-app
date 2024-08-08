/**
 * @file /middlewares/api/validators/settings/site/general/validate-general-settings-files.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 22 April, 2024
 */

const {
    BRAND_LOGO_TYPES,
    FAVICON_TYPES,
    ONE_MEGA_BYTE,
    HALF_MEGA_BYTE,
} = require('../../../../../../constants');

// export general settings files validator middleware
module.exports = async (req, res, next) => {
    try {
        // get logo and favicon files
        const { logo, favicon } = req.files || {};

        // check if logo is an array
        if (logo && Array.isArray(logo)) {
            return res.status(400).json({
                message: 'Logo must be a single image.',
            });
        }

        // check if favicon is an array
        if (favicon && Array.isArray(favicon)) {
            return res.status(400).json({
                message: 'Favicon must be a single image.',
            });
        }

        // check if logo is not an image of allowed types
        if (logo && !BRAND_LOGO_TYPES.includes(logo.mimetype)) {
            return res.status(400).json({
                message: `Logo must be of type ${BRAND_LOGO_TYPES.join(', ')}.`,
            });
        }

        // check if favicon is not an image of allowed types
        if (favicon && !FAVICON_TYPES.includes(favicon.mimetype)) {
            return res.status(400).json({
                message: `Favicon must be of type ${FAVICON_TYPES.join(', ')}.`,
            });
        }

        // check if logo size is greater than 0.5 MB
        if (logo && logo.size > HALF_MEGA_BYTE) {
            return res.status(400).json({
                message: `Logo size must be less than ${(
                    HALF_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // check if favicon size is greater than 0.5 MB
        if (favicon && favicon.size > HALF_MEGA_BYTE) {
            return res.status(400).json({
                message: `Favicon size must be less than ${(
                    HALF_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        return next();
    } catch (error) {
        console.error(
            'Error validating general settings files:',
            error.message
        );
        return res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
