/**
 * @file /controllers/api/settings/content/umrah-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// export umrah offers controllers
module.exports = {
    getUmrahOffers: require('./get-umrah-offers'),
    getUmrahOffer: require('./get-umrah-offer'),
    createUmrahOffer: require('./create-umrah-offer'),
    updateUmrahOffer: require('./update-umrah-offer'),
    deleteUmrahOffer: require('./delete-umrah-offer'),
    deleteManyUmrahOffers: require('./delete-many-umrah-offers'),
    updateUmrahOfferStatus: require('./update-hotel-umrah-status'),
};
