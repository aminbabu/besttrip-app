/**
 * @file /models/customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const {
    CUSTOMER_STATUS,
    CUSTOMER_WALLET_TRANSACTION_TYPES,
    CUSTOMER_ROLES,
} = require('../constants/_customers');

// customer schema
const customerSchema = new mongoose.Schema(
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
            trim: true,
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
            default: 'customer',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: CUSTOMER_STATUS,
            default: 'active',
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
                default: 'top-up',
            },
            description: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

// hash password before saving
customerSchema.pre('save', async function (next) {
    try {
        // check if password is modified
        if (!this.isModified('password')) {
            return next();
        }

        // hash password
        this.password = await bcrypt.hash(this.password, 10);

        return next();
    } catch (error) {
        return next(error);
    }
});

// generate customer id
customerSchema.pre('save', async function (next) {
    try {
        // check if customer id is modified
        if (!this.isModified('customerID')) {
            return next();
        }
        // Get the last customer ID if any
        const lastCustomer = await this.constructor.findOne({}, {}, { sort: { createdAt: -1 } });

        // get count by splitting customer ID (format: BTCYYYYMMDD0001) using moment
        const count = lastCustomer
            ? parseInt(lastCustomer.customerID.split(moment().format('YYYYMMDD'))[1], 10)
            : 0;

        // generate incrementing customer ID
        this.customerID = `BTC${moment().format('YYYYMMDD')}${count + 1}`; // BTCYYYYMMDD0001

        return next();
    } catch (error) {
        return next(error);
    }
});

// calculate wallet balance based on transaction type
customerSchema.pre('save', async function (next) {
    try {
        // check if wallet is modified
        if (!this.isModified('wallet')) {
            return next();
        }

        // get wallet object
        const { wallet } = this;

        // calculate wallet balance based on transaction type
        switch (wallet.type) {
            case 'top-up':
                this.wallet.balance += wallet.balance;
                break;
            case 'deduct':
                this.wallet.balance -= wallet.balance;
                break;
            default:
                break;
        }

        return next();
    } catch (error) {
        return next(error);
    }
});

// export model
module.exports = mongoose.model('Customer', customerSchema);
