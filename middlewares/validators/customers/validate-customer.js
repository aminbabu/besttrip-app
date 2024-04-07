/**
 * @file /middlewares/validators/customers/update-customer.js
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

        throw new Error('You are not allowed to update the customer ID');
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
    body('dob').optional().isISO8601().withMessage('dob should be a date'),
    body('status')
        .optional()
        .isIn(['active', 'disabled'])
        .withMessage('status should be active or disabled'),
    body('address')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('address should be at least 3 characters'),
    body('city').optional().trim().isLength({ min: 3 }).withMessage('city should be at least 3 characters'),
    body('state').optional().trim().isLength({ min: 3 }).withMessage('state should be at least 3 characters'),
    body('country').optional().trim().isLength({ min: 3 }).withMessage('country should be at least 3 characters'),
    body('postalCode')
        .optional()
        .isPostalCode('any')
        .withMessage('postalCode should be a postal code'),
    body('flyerNumber').optional().trim().isString().withMessage('flyerNumber should be a string'),
    body('wallet')
        .optional()
        .isObject()
        .withMessage('wallet should be an object')
        .custom((value) => {
            const { balance, type, description } = value;

            if (!balance || typeof balance !== 'number' || Number.isNaN(balance)) {
                throw new Error('balance is required and should be a number');
            }
            if (balance < 0) {
                throw new Error('balance should be a positive number');
            }
            if (!['top-up', 'deduct'].includes(type)) {
                throw new Error('balance type should be top-up or deduct');
            }
            if (description && typeof description !== 'string') {
                throw new Error('description should be a string');
            }
            return true;
        }),
    body('role').optional().trim().isString().withMessage('role should be a string'),
    body('isVerified').optional().isBoolean().withMessage('isVerified should be a boolean'),
    expressValidator,
];
