/**
 * @file /schemas/mongoose/invoice.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const {
    UMRAH_BOOKING_PAYMENT_TYPE,
} = require('../../constants/umrah-bookings');

// export umrah package type schema
module.exports = new Schema(
    {
        invoiceId: {
            type: String,
            required: [true, 'Invoice ID is required'],
        },
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: 'umrahbookings',
            required: [true, 'Booking ID is required'],
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer is required'],
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required'],
        },
        paymentType: {
            type: String,
            enum: UMRAH_BOOKING_PAYMENT_TYPE,
            required: [true, 'Payment Type is required'],
        },
        partialPaymentExpiryDate: {
            type: Date,
        },
        paidAmount: {
            type: Number,
            required: [true, 'Paid amount is required'],
        },
        partialPaymentRestAmount: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);
