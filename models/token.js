/**
 * @file /models/token.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const mongoose = require('mongoose');

// token schema
const tokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [() => this.user, 'User is required'],
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
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
            required: [true, 'Expire time is required'],
        },
    },
    {
        timestamps: true,
    }
);

// token model
const Token = mongoose.model('Token', tokenSchema);

// export model
module.exports = Token;
