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
const { Schema } = mongoose;

// token schema
const tokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        expires: {
            type: Date,
            required: true,
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
