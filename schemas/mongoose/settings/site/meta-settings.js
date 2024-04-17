/**
 * @file /schemas/mongoose/settings/site/meta-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export meta settings schema
module.exports = new Schema(
    {
        meta: [
            {
                name: {
                    type: String,
                    required: [true, 'Meta name is required'],
                },
                content: {
                    type: String,
                    required: [true, 'Meta content is required'],
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
