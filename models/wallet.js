/**
 * @file /models/wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March 2024
 * @update_date 29 March 2024
 */

// dependencies
const mongoose = require('mongoose');

// wallet schema
const walletSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer is required'],
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// export model
module.exports = mongoose.model('Customer', walletSchema);
