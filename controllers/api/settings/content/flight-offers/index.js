/**
 * @file /controllers/api/settings/content/umrah-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 20 April, 2024
 */

// export flight offers controllers
module.exports = {
    updateFlightOfferStatus: require('./update-flight-status.js'),
    getFlightOffers: require('./get-flight-offers'),
    getFlightOffer: require('./get-flight-offer'),
    createFlightOffer: require('./create-flight-offer'),
    updateFlightOffer: require('./update-flight-offer'),
    deleteFlightOffer: require('./delete-flight-offer'),
    deleteManyHotelOffers: require('./delete-many-flight-offers.js'),
};
