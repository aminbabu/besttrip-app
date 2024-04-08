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
} = require('../constants');

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

        console.log(this.isModified('password'), 'isModified password');

        // hash password
        this.password = await bcrypt.hash(this.password, 10);

        return next();
    } catch (error) {
        return next(error);
    }
});

// generate customer id before saving
customerSchema.pre('save', async function (next) {
    try {
        // check if customer is new
        if (!this.isNew) {
            return next();
        }

        console.log(this.isNew, 'isNew customer');

        // Get the last customer ID if any
        const lastCustomer = await this.constructor.findOne({}, {}, { sort: { createdAt: -1 } });

        // get count from the last customer ID if any or set to 0
        let count = lastCustomer ? parseInt(lastCustomer.customerID.slice(11), 10) : 0;

        // check pad count with 0 if less than 4 digits and increment by 1
        count = count > 9999 ? count + 1 : (count + 1).toString().padStart(4, '0');

        // customer ID based on date (YYYYMMDD) and count (0001, 0002, ...) with prefix 'BTC'
        this.customerID = `BTC${moment().format('YYYYMMDD')}${count}`;

        return next();
    } catch (error) {
        return next(error);
    }
});

// export model
module.exports = mongoose.model('Customer', customerSchema);
