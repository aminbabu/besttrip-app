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

// update customer validator
module.exports = [
    body('avatar').optional().isURL().withMessage('avatar should be a URL'),
    body('name')
        .exists()
        .withMessage('name is required')
        .isString()
        .withMessage('name should be a string'),
    body('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email should be an email'),
    body('phone')
        .exists()
        .withMessage('phone is required')
        .isMobilePhone()
        .withMessage('phone should be a phone number'),
    body('password')
        .exists()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('password should be at least 6 characters'),
    body('dob')
        .exists()
        .withMessage('dob is required')
        .isISO8601()
        .withMessage('dob should be a date'),
    body('status')
        .exists()
        .withMessage('status is required')
        .isIn(['active', 'disabled'])
        .withMessage('status should be active or disabled'),
    body('address')
        .exists()
        .withMessage('address is required')
        .isString()
        .withMessage('address should be a string'),
    body('city')
        .exists()
        .withMessage('city is required')
        .isString()
        .withMessage('city should be a string'),
    body('state')
        .exists()
        .withMessage('state is required')
        .isString()
        .withMessage('state should be a string'),
    body('country')
        .exists()
        .withMessage('country is required')
        .isString()
        .withMessage('country should be a string'),
    body('postalCode')
        .exists()
        .withMessage('postalCode is required')
        .isPostalCode()
        .withMessage('postalCode should be a postal code'),
    body('flyerNumber')
        .exists()
        .withMessage('flyerNumber is required')
        .isString()
        .withMessage('flyerNumber should be a string'),
    body('wallet')
        .isObject()
        .withMessage('wallet should be an object')
        .custom((value) => {
            if (value.balance === undefined) {
                throw new Error('balance is required');
            }
            if (value.balance < 0) {
                throw new Error('balance should be a positive number');
            }
            return true;
        }),
];
