/**
 * @file /middlewares/api/validators/settings/content/umrah-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// export
module.exports = {
    validateUmrahOfferStatus: require('./validate-umrah-offer-status'),
    validateUmrahOfferIds: require('./validate-umrah-offer-ids'),
    validateUmrahOfferId: require('./validate-umrah-offer-id'),
    validateUmrahOffer: require('./validate-umrah-offer'),
    validateUmrahOfferFile: require('./validate-umrah-offer-file'),
};
