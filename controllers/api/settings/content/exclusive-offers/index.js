/**
 * @file /controllers/api/settings/content/exclusive-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 03 Jul, 2024
 */

// export exclusive offers controllers
module.exports = {
    getExclusiveOffers: require('./get-exclusive-offers'),
    getExclusiveOffer: require('./get-exclusive-offer'),
    createExclusiveOffer: require('./create-exclusive-offer'),
    updateExclusiveOffer: require('./update-exclusive-offer'),
    updateExclusiveOfferStatus: require('./update-exclusive-offer-status'),
    deleteExclusiveOffer: require('./delete-exclusive-offer'),
};
