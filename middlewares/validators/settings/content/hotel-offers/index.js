/**
 * @file /middlewares/validators/settings/content/hotel-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// export
module.exports = {
    validateHotelOfferId: require('./validate-hotel-offer-id'),
    validateHotelOffer: require('./validate-hotel-offer'),
    validateHotelOfferFile: require('./validate-hotel-offer-file'),
};
