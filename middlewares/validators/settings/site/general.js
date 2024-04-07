/**
 * @file /middlewares/validators/settings/site/general.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 06 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../../handlers/errors');
const { uploadMedia } = require('../../../../utils');
const { BRAND_LOGO_TYPES, ONE_MEGA_BYTE } = require('../../../../constants');

// export general site settings validator
module.exports = [
    uploadMedia(ONE_MEGA_BYTE, BRAND_LOGO_TYPES, 'logos').fields([
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
    ]),
    body('title')
        .isLength({ min: 3, max: 50 })
        .withMessage('Title must be between 3 and 255 characters'),
    body('domain').isArray({ min: 1 }).withMessage('Domain is required'),
    body('description')
        .isLength({ min: 3, max: 500 })
        .withMessage('Description must be between 3 and 255 characters'),
    expressValidator,
];
