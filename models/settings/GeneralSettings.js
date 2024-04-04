/**
 * @file /models/settings/GeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const mongoose = require('mongoose');

// general settings schema
const generalSettingsSchema = new mongoose.Schema(
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
            type: String,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

// export model
module.exports = mongoose.model('GeneralSettings', generalSettingsSchema);
