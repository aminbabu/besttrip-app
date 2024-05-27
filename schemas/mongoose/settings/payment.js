/**
 * @file /schemas/mongoose/settings/payments.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { PAYMENTS_STATUS } = require('../../../constants/api');

// export payment settings schema
module.exports = new Schema(
    {
        accountHolderName: {
            type: String,
            required: [true, 'Account holder name is required'],
        },
        accountNumber: {
            type: String,
            required: [true, 'Account number is required'],
        },
        bankName: {
            type: String,
            required: [true, 'Bank name is required'],
        },
        branchName: {
            type: String,
            required: [true, 'Branch name is required'],
        },
        routingNumber: {
            type: String,
            required: [true, 'Routing number is required'],
        },
        swiftCode: {
            type: String,
            required: [true, 'Swift code is required'],
        },
        status: {
            type: String,
            enum: PAYMENTS_STATUS,
            default: PAYMENTS_STATUS[0],
        },
    },
    { timestamps: true }
);
