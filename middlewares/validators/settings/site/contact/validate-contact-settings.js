/**
 * @file /middlewares/validators/settings/site/contact/validate-contact-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../../../handlers/errors');

// export contact settings validator
module.exports = [
    body('email').optional().isEmail().withMessage('Please provide a valid email address'),
    body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
    body('social').optional().isArray({ min: 1 }).withMessage('Social is required'),
    body('social.*').optional().isURL().withMessage('Please provide a valid URL'),
    body('address')
        .optional()
        .isLength({ min: 3, max: 255 })
        .withMessage('Address must be between 3 and 255 characters'),
    expressValidator,
];
