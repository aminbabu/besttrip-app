/**
 * @file /middlewares/validators/users/validate-user-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// update user validator
module.exports = [
    body('userID').custom((value) => {
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update the user ID');
    }),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('name should be at least 3 characters'),
    body('email').optional().isEmail().withMessage('email should be an email'),
    body('phone').optional().isMobilePhone().withMessage('phone should be a phone number'),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('password should be at least 6 characters'),
    body('status').custom((value) => {
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update the status');
    }),
    body('address')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('address should be at least 3 characters'),
    body('city')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('city should be at least 3 characters'),
    body('state')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('state should be at least 3 characters'),
    body('country')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('country should be at least 3 characters'),
    body('postalCode')
        .optional()
        .isPostalCode('any')
        .withMessage('postalCode should be a postal code'),
    body('role').custom((value) => {
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update the role');
    }),
    body('isVerified').custom((value) => {
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update the verification status');
    }),
    expressValidator,
];
