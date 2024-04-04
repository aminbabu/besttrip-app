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

// export general site settings validator
module.exports = [
    body('logo').optional().isString().withMessage('Logo must be a string'),
    body('favicon').optional().isString().withMessage('Favicon must be a string'),
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    body('domain').optional().isString().withMessage('Domain must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
];
