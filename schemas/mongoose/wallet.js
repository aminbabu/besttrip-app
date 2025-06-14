/**
 * @file /schemas/mongoose/wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { WALLET_TRANSACTION_TYPES } = require('../../constants');

// export customer schema
module.exports = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [
                (self) => (self?.customer ? false : true),
                'User is required',
            ],
            sparse: true,
            unique: [true, 'User already has a wallet'],
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: [
                (self) => (self?.user ? false : true),
                'Customer is required',
            ],
            sparse: true,
            unique: [true, 'Customer already has a wallet'],
        },
        balance: {
            type: Number,
            required: [true, 'Wallet balance is required'],
            default: 0,
        },
        type: {
            type: String,
            enum: WALLET_TRANSACTION_TYPES,
            default: WALLET_TRANSACTION_TYPES[0],
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
