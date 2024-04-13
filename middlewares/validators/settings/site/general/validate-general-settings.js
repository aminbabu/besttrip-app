/**
 * @file /middlewares/validators/settings/site/general/validate-general-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../../../handlers/errors');

// export general site settings validator
module.exports = [
    body('logo').not().exists().withMessage('Logo should be a valid image file'),
    body('favicon').not().exists().withMessage('Favicon should be a valid image file'),
    body('title')
        .isLength({ min: 3, max: 50 })
        .withMessage('Title must be between 3 and 255 characters'),
    body('domain').isArray({ min: 1 }).withMessage('Domain is required'),
    body('description')
        .isLength({ min: 3, max: 1000 })
        .withMessage('Description must be between 3 and 1000 characters'),
    expressValidator,
];
