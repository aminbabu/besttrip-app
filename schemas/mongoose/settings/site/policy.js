/**
 * @file /schemas/mongoose/settings/site/policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export customer schema
module.exports = new Schema(
    {
        'about-us': {
            type: String,
            trim: true,
        },
        'terms-of-conditions': {
            type: String,
            trim: true,
        },
        'refund-policy': {
            type: String,
            trim: true,
        },
        'privacy-policy': {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);
