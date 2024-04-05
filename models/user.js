/**
 * @file /models/user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { USER_STATUS, USER_ROLES } = require('../constants/_users');

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
        if (!this.$isNew) {
            return next();
        }

        // Get the last user ID if any
        const lastUser = await this.constructor.findOne({}, {}, { sort: { createdAt: -1 } });

        // get count by splitting user ID (format: BTYYYYMMDD0001) using moment
        const count = lastUser
            ? parseInt(lastUser.userID.split(moment().format('YYYYMMDD'))[1], 10)
            : 0;

        console.log(lastUser);

        // generate incrementing user ID
        this.userID = `BT${moment().format('YYYYMMDD')}${count + 1}`; // BTYYYYMMDD0001

        return next();
    } catch (error) {
        return next(error);
    }
});

// export model
module.exports = mongoose.model('User', userSchema);
