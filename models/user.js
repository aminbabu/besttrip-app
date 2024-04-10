/**
 * @file /models/user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { USER_STATUS, USER_ROLES } = require('../constants');

// user schema
const userSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            unique: [true, 'User ID already exists'],
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
            enum: USER_ROLES,
            default: 'user',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: USER_STATUS,
            default: 'active',
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
    },
    {
        timestamps: true,
    }
);

// hash password before saving
userSchema.pre('save', async function (next) {
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

// generate user id before saving
userSchema.pre('save', async function (next) {
    try {
        // check if user is new
        if (!this.isNew) {
            return next();
        }

        // Get the last user ID if any
        const lastUser = await this.constructor.findOne({}, {}, { sort: { createdAt: -1 } });

        // get count from the last user ID if any or set to 0
        let count = lastUser ? parseInt(lastUser.userID.slice(11), 10) : 0;

        // check pad count with 0 if less than 4 digits and increment by 1
        count = count > 9999 ? count + 1 : (count + 1).toString().padStart(4, '0');

        // user ID based on date (YYYYMMDD) and count (0001, 0002, ...) with prefix 'BT'
        this.userID = `BT${moment().format('YYYYMMDD')}${count}`;

        return next();
    } catch (error) {
        return next(error);
    }
});

// export model
module.exports = mongoose.model('User', userSchema);
