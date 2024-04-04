/**
 * @file /middlewares/validators/settings/site/general.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../../handlers/errors');

// export general site settings validator
module.exports = [
    body('logo').optional().isURL().withMessage('Logo must be a valid URL'),
    body('favicon').optional().isURL().withMessage('Favicon must be a valid URL'),
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    body('domain').optional().isURL().withMessage('Domain must be a valid URL'),
    body('description').optional().isString().withMessage('Description must be a string'),
    expressValidator,
];
