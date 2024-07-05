/**
 * @file /schemas/mongoose/umrah/bookings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { UMRAH_BOOKING_STATUS } = require('../../../constants');

// export umrah package type schema
module.exports = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer is required'],
        },
        umrahPackage: {
            type: Schema.Types.ObjectId,
            ref: 'UmrahPackage',
            required: [true, 'Umrah package is required'],
        },
        status: {
            type: String,
            enum: UMRAH_BOOKING_STATUS,
            default: UMRAH_BOOKING_STATUS[0],
        },
    },
    {
        timestamps: true,
    }
);
