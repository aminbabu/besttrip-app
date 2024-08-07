/**
 * @file middlewares/api/validators/traveler/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// export all roles validators
module.exports = {
    validateUmrahBookingId: require('./validate-umrah-booking-id'),
    validateTravelerId: require('./validate-traveler-id'),
    validateTraveler: require('./validate-traveler'),
    validateTravelerUpdate: require('./validate-traveler-update'),
    validateTravelerPhoto: require('./validate-traveler-photo'),
    validateTravelerPassport: require('./validate-traveler-passport'),
    validateTravelerNID: require('./validate-traveler-nid'),
    validateTravelerCovidCertificate: require('./validate-traveler-covid-certificate'),
};
