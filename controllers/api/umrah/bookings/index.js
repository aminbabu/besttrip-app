/**
 * @file /controllers/api/umrah/bookings/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// export all umrah bookings controllers
module.exports = {
    viewUmrahBookings: require('./view-umrah-bookings'),
    viewCustomerBookings: require('./view-customer-bookings'),
    createUmrahBooking: require('./create-umrah-booking'),
    getUmrahBookingByIdForAdmin: require('./get-umrah-booking-by-id-for-admin'),
    getUmrahBookingByIdForCustomer: require('./get-umrah-booking-by-id-for-customer'),
    updateUmrahBookingStatus: require('./update-umrah-booking-status-for-admin'),
    deleteUmrahBookingByIdForAdmin: require('./delete-umrah-booking-for-admin'),
    deleteUmrahBookingByIdForCustomer: require('./delete-umrah-booking-for-customer'),
};
