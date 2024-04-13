/**
 * @file /models/settings/site/ContactSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const mongoose = require('mongoose');

// contact settings schema
const contactSettingsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        social: {
            type: [
                {
                    name: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        address: {
            type: String,
        },
        map: {
            type: String,
        },
    },
    { timestamps: true }
);

// export model
module.exports = mongoose.model('ContactSettings', contactSettingsSchema);
