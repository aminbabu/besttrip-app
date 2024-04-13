/**
 * @file /middlewares/validators/users/update-user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');
const { USER_ROLES, USER_STATUS } = require('../../../constants');

// update user validator
module.exports = [
    body('userID').not().exists().withMessage('You are not allowed to update the user ID'),
    body('avatar').not().exists().withMessage('Avatar should be a valid image file'),
    body('name').isLength({ min: 3 }).withMessage('Name should be at least 3 characters'),
    body('email').isEmail().withMessage('Email should be a valid email'),
    body('phone').isMobilePhone().withMessage('Phone should be a valid phone number'),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters'),
    body('status')
        .optional()
        .isIn(USER_STATUS)
        .withMessage(`Status should be one of ${USER_STATUS.join(', ')}`),
    body('address')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('Address should be between 3 and 100 characters'),
    body('city')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('City should be between 3 and 50 characters'),
    body('state')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('State should be between 3 and 50 characters'),
    body('country')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('Country should be between 3 and 50 characters'),
    body('postalCode')
        .optional()
        .isPostalCode()
        .withMessage('Postal code should be a valid postal code'),
    body('role')
        .optional()
        .isIn(USER_ROLES)
        .withMessage(`Role should be only ${USER_ROLES.join(', ')}`),
    body('isVerified')
        .optional()
        .isBoolean()
        .withMessage('Customer verification status should be a boolean'),
    expressValidator,
];
