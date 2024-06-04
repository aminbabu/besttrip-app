/**
 * @file /schemas/mongoose/history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export history schema
module.exports = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [() => this.user, 'User is required'],
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: [() => this.customer, 'Customer is required'],
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
                required: [true, 'City is required'],
            },
            country: {
                type: String,
                required: [true, 'Country is required'],
            },
        },
    },
    {
        timestamps: true,
    }
);
