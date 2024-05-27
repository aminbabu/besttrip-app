/**
 * @file /middlewares/validators/settings/content/exclusive-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// export
module.exports = {
    validateExclusiveOfferId: require('./validate-exclusive-offer-id'),
    validateExclusiveOffer: require('./validate-exclusive-offer'),
    validateExclusiveOfferFile: require('./validate-exclusive-offer-file'),
};
