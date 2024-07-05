/**
 * @file /schemas/mongoose/login-history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { LOGIN_HISTORY_STATUS } = require('../../constants');

// export history schema
module.exports = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
        },
        status: {
            type: String,
            enum: LOGIN_HISTORY_STATUS,
            default: 'active',
            required: [true, 'Status is required'],
        },
        lastLogin: {
            type: Date,
            required: [true, 'Last login is required'],
        },
        userAgent: {
            type: String,
            required: [true, 'User agent is required'],
        },
        ipAddress: {
            type: String,
            required: [true, 'IP address is required'],
        },
        location: {
            city: {
                type: String,
            },
            region: {
                type: String,
            },
            country: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);
