/**
 * @file /schemas/mongoose/user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { USER_STATUS, USER_ROLES } = require('../../constants');

// export user schema
module.exports = new Schema(
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
