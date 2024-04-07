/**
 * @file /middlewares/validators/customers/validate-customer-wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const { body } = require('express-validator');

// export customer wallet validator
module.exports = [
    body('wallet')
        .isObject()
        .withMessage('wallet should be an object')
        .custom((value) => {
            if (!value) {
                throw new Error('wallet is required');
            }

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
];
