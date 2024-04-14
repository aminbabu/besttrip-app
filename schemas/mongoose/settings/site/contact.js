/**
 * @file /schemas/mongoose/settings/site/contact.js
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
