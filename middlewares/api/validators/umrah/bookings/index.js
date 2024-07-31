/**
 * @file /middlewares/api/validators/umrah/bookings/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 15 May, 2024
 */

// export umrah bookings validators
module.exports = {
    validateUmrahBooking: require('./validate-umrah-booking'),
    validateUmrahBookingId: require('./validate-umrah-booking-id'),
    validateUmrahBookingIds: require('./validate-umrah-booking-ids'),
    validateUmrahBookingStatus: require('./validate-umrah-booking-status'),
};
