/**
 * @file /schemas/mongoose/token.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export token schema
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
        token: {
            type: String,
            required: [true, 'Token is required'],
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
        },
        expires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);
