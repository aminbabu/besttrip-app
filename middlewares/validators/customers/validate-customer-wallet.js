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
        .withMessage('Wallet is required')
        .isObject()
        .withMessage('Wallet should be an object'),
    body('wallet.balance')
        .exists()
        .withMessage('Balance is required')
        .isNumeric()
        .withMessage('Balance should be a number')
        .custom((value) => {
            if (value < 0) {
                throw new Error('Balance should be a positive number');
            }
            return true;
        }),
    body('wallet.type')
        .exists()
        .withMessage('Balance type is required')
        .isIn(CUSTOMER_WALLET_TRANSACTION_TYPES)
        .withMessage(
            `Balance type should be one of ${CUSTOMER_WALLET_TRANSACTION_TYPES.join(', ')}`
        ),
    body('wallet.description')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('Description should be between 3 and 100 characters'),
];
