/**
 * @file /middlewares/validators/customers/update-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 03 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// update customer validator
module.exports = [
    body('avatar').optional().isURL().withMessage('avatar should be a URL'),
    body('name').optional().isString().withMessage('name should be a string'),
    body('email').optional().isEmail().withMessage('email should be an email'),
    body('phone').optional().isMobilePhone().withMessage('phone should be a phone number'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('password should be at least 6 characters'),
    body('dob').optional().isISO8601().withMessage('dob should be a date'),
    body('status')
        .optional()
        .isIn(['active', 'disabled'])
        .withMessage('status should be active or disabled'),
    body('address').optional().isString().withMessage('address should be a string'),
    body('city').optional().isString().withMessage('city should be a string'),
    body('state').optional().isString().withMessage('state should be a string'),
    body('country').optional().isString().withMessage('country should be a string'),
    body('postalCode')
        .optional()
        .isPostalCode('any')
        .withMessage('postalCode should be a postal code'),
    body('flyerNumber').optional().isString().withMessage('flyerNumber should be a string'),
    body('wallet').custom((value) => {
        // check if wallet exists
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update your wallet');
    }),
    body('role').custom((value) => {
        // check if role exists
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update your role');
    }),
    body('isVerified').custom((value) => {
        // check if isVerified exists
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update your verification status');
    }),
    expressValidator,
];
