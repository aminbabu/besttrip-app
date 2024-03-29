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

// user schema
const userSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: [true, 'User ID is required'],
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
            enum: ['user', 'admin'],
            default: 'user',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['active', 'disabled'],
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

        // generate incrementing user ID
        const count = await this.model('User').countDocuments();
        this.userID = `BT${moment().format('YYYY')}${count + 1}`; // BTCYYYY0001

        return next();
    } catch (error) {
        return next(error);
    }
});

// export model
module.exports = mongoose.model('User', userSchema);
