/**
 * @file /schemas/mongoose/umrah/package-duration.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { UMRAH_PACKAGE_DURATION_STATUS } = require('../../../constants');

// export umrah package duration schema
module.exports = new Schema(
    {
        days: {
            type: Number,
            required: [true, 'Total Days is required'],
        },
        nights: {
            type: Number,
            required: [true, 'Total Nights is required'],
        },
        status: {
            type: String,
            enum: UMRAH_PACKAGE_DURATION_STATUS,
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);
