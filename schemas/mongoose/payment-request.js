/**
 * @file /schemas/mongoose/payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { PAYMENT_REQUEST_STATUS } = require('../../constants');

// export payment request schema
module.exports = new Schema(
    {
        refId: {
            type: String,
            unique: [true, 'Reference ID must be unique'],
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
        },
        account: {
            type: String,
            required: [true, 'Account is required'],
        },
        paymentMethod: {
            type: String,
            required: [true, 'Payment method is required'],
        },
        paymentDate: {
            type: Date,
            required: [true, 'Payment date is required'],
        },
        attachment: {
            type: String,
        },
        status: {
            type: String,
            enum: PAYMENT_REQUEST_STATUS,
            default: PAYMENT_REQUEST_STATUS[0],
        },
        note: {
            type: String,
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);
