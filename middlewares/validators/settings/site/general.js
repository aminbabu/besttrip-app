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
    body('logo')
        .isEmpty()
        .withMessage('Logo is required')
        .isString()
        .withMessage('Logo must be a string'),
    body('favicon')
        .isEmpty()
        .withMessage('Favicon is required')
        .isString()
        .withMessage('Favicon must be a string'),
    body('title')
        .isLength({ min: 3 })
        .withMessage('Title is required and must be at least 3 characters')
        .isString()
        .withMessage('Title must be a string'),
    body('domain')
        .isEmpty()
        .withMessage('Domain is required')
        .isString()
        .withMessage('Domain must be a string'),
    body('description')
        .isEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string'),
];
