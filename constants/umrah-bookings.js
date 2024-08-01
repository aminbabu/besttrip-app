/**
 * @file /constants/umrah-bookings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// umrah bookings status
const UMRAH_BOOKING_STATUS = [
    'pending',
    'in-process',
    'under-review',
    'success',
    'booked',
    'cancelled',
];

// umrah booking payment type
const UMRAH_BOOKING_PAYMENT_TYPE = ['partial-payment', 'full-payment'];

// export umrah bookings status
module.exports = {
    UMRAH_BOOKING_STATUS,
    UMRAH_BOOKING_PAYMENT_TYPE,
};
