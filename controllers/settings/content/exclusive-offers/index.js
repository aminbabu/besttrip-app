/**
 * @file /controllers/settings/content/exclusive-offers/get-exclusive-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// export exclusive offers controllers
module.exports = {
    getExclusiveOffers: require('./get-exclusive-offers'),
    getExclusiveOffersById: require('./get-exclusive-offers-by-id'),
    createExclusiveOffer: require('./create-exclusive-offer'),
    updateExclusiveOffer: require('./update-exclusive-offer'),
    deleteExclusiveOffer: require('./delete-exclusive-offer'),
};
