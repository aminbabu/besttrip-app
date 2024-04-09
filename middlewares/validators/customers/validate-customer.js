/**
 * @file /middlewares/validators/customers/update-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 09 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');
const {
    CUSTOMER_ROLES,
    CUSTOMER_STATUS,
    CUSTOMER_WALLET_TRANSACTION_TYPES,
} = require('../../../constants');

// update customer validator
module.exports = [
    body('customerID').not().exists().withMessage('You are not allowed to update the customer ID'),
    body('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Name should be at least 3 characters'),
    body('email')
        .optional()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email should be a valid email'),
    body('phone').optional().isMobilePhone().withMessage('Phone should be a valid phone number'),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters'),
    body('dob')
        .optional()
        .toDate()
        .isDate()
        .withMessage('Date of birth should be a valid javascript date'),
    body('status')
        .optional()
        .isIn(CUSTOMER_STATUS)
        .withMessage(`Status should be one of ${CUSTOMER_STATUS.join(', ')}`),
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
    body('flyerNumber').optional().isNumeric().withMessage('Flyer number should be a number'),
    body('wallet').optional().isObject().withMessage('Wallet should be an object'),
    body('wallet.balance')
        .optional()
        .isNumeric()
        .withMessage('balance should be a number')
        .custom((value) => {
            if (value < 0) {
                throw new Error('balance should be a positive number');
            }
            return true;
        }),
    body('wallet.type')
        .optional()
        .isIn(CUSTOMER_WALLET_TRANSACTION_TYPES)
        .withMessage('balance type should be top-up or deduct'),
    body('wallet.description')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('Description should be between 3 and 100 characters'),
    body('role')
        .optional()
        .isIn(CUSTOMER_ROLES)
        .withMessage(`Role should be only ${CUSTOMER_ROLES.join(', ')}`),
    body('isVerified')
        .optional()
        .isBoolean()
        .withMessage('Customer verification status should be a boolean'),
    expressValidator,
];
