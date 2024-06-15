/**
 * @file /schemas/mongoose/general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export general ledger schema
module.exports = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        invoice: {
            type: Schema.Types.ObjectId,
            ref: 'Invoice',
            required: true,
        },
        booking: {
            type: Schema.Types.ObjectId,
            ref: 'Booking',
            required: true,
        },
        bookingType: {
            type: String,
            required: true,
        },
        bookingDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
