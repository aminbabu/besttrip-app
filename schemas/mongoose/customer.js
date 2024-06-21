/**
 * @file /schemas/mongoose/customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const {
    CUSTOMER_WALLET_TRANSACTION_TYPES,
    CUSTOMER_ROLES,
    CUSTOMER_STATUS,
} = require('../../constants');

// export customer schema
module.exports = new Schema(
    {
        customerID: {
            type: String,
            unique: [true, 'Customer ID already exists'],
        },
        avatar: {
            type: String,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            unique: [true, 'Phone already exists'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
        },
        role: {
            type: String,
            enum: CUSTOMER_ROLES,
            default: CUSTOMER_ROLES[0],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: CUSTOMER_STATUS,
            default: CUSTOMER_STATUS[1],
        },
        twoStepAuth: {
            type: Boolean,
            default: false,
        },
        dob: {
            type: Date,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        flyerNumber: {
            type: String,
        },
        wallet: {
            balance: {
                type: Number,
                required: [true, 'Wallet balance is required'],
                default: 0,
            },
            type: {
                type: String,
                enum: CUSTOMER_WALLET_TRANSACTION_TYPES,
                default: CUSTOMER_WALLET_TRANSACTION_TYPES[0],
            },
            description: {
                type: String,
            },
        },
        loginHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'LoginHistory',
            },
        ],
    },
    {
        timestamps: true,
    }
);
