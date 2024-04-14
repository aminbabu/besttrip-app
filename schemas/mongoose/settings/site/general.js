/**
 * @file /schemas/mongoose/settings/site/general.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export customer schema
module.exports = new Schema(
    {
        logo: {
            type: String,
        },
        favicon: {
            type: String,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        domain: {
            type: Array,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);
