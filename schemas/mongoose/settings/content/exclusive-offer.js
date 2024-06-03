/**
 * @file /schemas/mongoose/settings/content/exclusive-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { EXCLUSIVE_STATUS } = require('../../../../constants');

// export exclusive content settings schema
module.exports = new Schema(
    {
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required'],
        },
        link: {
            type: String,
            required: [true, 'Link is required'],
        },
        status: {
            type: String,
            enum: EXCLUSIVE_STATUS,
            required: [true, 'Status is required'],
        },
    },
    {
        timestamps: true,
    }
);
