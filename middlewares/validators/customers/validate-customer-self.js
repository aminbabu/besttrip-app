/**
 * @file /middlewares/validators/customers/update-customer-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// update customer validator
module.exports = [
    body('customerID').custom((value) => {
        if (!value) {
            return true;
        }

        throw new Error('You are not allowed to update your customer ID');
    }),
    body('name').optional().trim()
        .isLength({ min: 3 }).withMessage('name should be at least 3 characters'),
    body('email').optional().isEmail().withMessage('email should be an email'),
    body('phone').optional().isMobilePhone().withMessage('phone should be a phone number'),
    body('password')
        .optional()
        .isLength({ min: 8 })
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
