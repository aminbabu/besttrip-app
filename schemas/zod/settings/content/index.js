/**
 * @file /schemas/zod/settings/content/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 20 April, 2024
 */

// export content sections settings schemas
module.exports = {
    sectionSettingsSchema: require('./section'),
    exclusiveOfferSchema: require('./exclusive-offer'),
    hotelOfferSchema: require('./hotel-offer'),
    flightOfferSchema: require('./flight-offer'),
    umrahOfferSchema: require('./umrah-offer'),
};
