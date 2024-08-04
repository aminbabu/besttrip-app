/**
 * @file /schemas/zod/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 14 May, 2024
 */

// export umrah package schema
module.exports = {
    umrahPackageIdSchema: require('./umrah-package-id'),
    umrahPackageSchema: require('./umrah-package'),
    umrahPackagesForCustomersSchema: require('./umrah-packages-for-customers'),
    umrahOutboundSchema: require('./umrah-outbound'),
    umrahMakkaHotelSchema: require('./umrah-makka-hotel'),
    umrahMadinahHotelSchema: require('./umrah-madinah-hotel'),
    umrahInboundSchema: require('./umrah-inbound'),
    umrahVisaSchema: require('./umrah-visa'),
    umrahTransportationSchema: require('./umrah-transportation'),
    umrahZiyarahSchema: require('./umrah-ziyarah'),
    umrahDayWiseItinerarySchema: require('./umrah-day-wise-itinerary'),
    umrahSchema: require('./umrah'),
    termsAndConditionsSchema: require('./terms-and-conditions'),
};
