/**
 * @file /middlewares/api/validators/settings/content/flight-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// export
module.exports = {
    validateFlightOfferId: require('./validate-flight-offer-id'),
    validateFlightOffer: require('./validate-flight-offer'),
    validateFlightOfferFile: require('./validate-flight-offer-file'),
};
