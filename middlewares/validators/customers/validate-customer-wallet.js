/**
 * @file /middlewares/validators/customers/validate-customer-wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { CUSTOMER_WALLET_TRANSACTION_TYPES } = require('../../../constants');

// export customer wallet validator
module.exports = [
    body('wallet')
        .exists()
        .withMessage('wallet is required')
        .isObject()
        .withMessage('Wallet should be an object'),
    body('wallet.balance')
        .exists()
        .withMessage('balance is required')
        .isNumeric()
        .withMessage('balance should be a number')
        .custom((value) => {
            if (value < 0) {
                throw new Error('balance should be a positive number');
            }
            return true;
        }),
    body('wallet.type')
        .exists()
        .withMessage('type is required')
        .isIn(CUSTOMER_WALLET_TRANSACTION_TYPES)
        .withMessage('balance type should be top-up or deduct'),
    body('wallet.description')
        .optional()
        .trim()
        .isString()
        .withMessage('description should be a string'),
];
