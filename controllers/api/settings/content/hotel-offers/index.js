/**
 * @file /controllers/settings/content/hotel-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 20 April, 2024
 */

// export hotel offers controllers
module.exports = {
    getHotelOffers: require('./get-hotel-offers'),
    getHotelOffer: require('./get-hotel-offer'),
    createHotelOffer: require('./create-hotel-offer'),
    updateHotelOffer: require('./update-hotel-offer'),
    deleteHotelOffer: require('./delete-hotel-offer'),
};
