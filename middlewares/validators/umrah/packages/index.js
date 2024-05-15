/**
 * @file /middlewares/validators/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 15 May, 2024
 */

// export umrah package validators
module.exports = {
    validateUmrahPackageId: require('./validate-umrah-package-id'),
    validateUmrahPackageThumbnail: require('./validate-umrah-package-thumbnail'),
    validateUmrahPackage: require('./validate-umrah-package'),
    validateUmrahPackageGallery: require('./validate-umrah-package-gallery'),
    validateUmrahOutbound: require('./validate-umrah-outbound'),
    validateMakkahHotelTumbnail: require('./validate-makkah-hotel-thumbnail'),
    validateMakkahHotel: require('./validate-makkah-hotel'),
    validateMakkahHotelGallery: require('./validate-makkah-hotel-gallery'),
    validateMadinahHotelTumbnail: require('./validate-madinah-hotel-thumbnail'),
    validateMadinahHotel: require('./validate-madinah-hotel'),
    validateMadinahHotelGallery: require('./validate-madinah-hotel-gallery'),
    validateUmrahInbound: require('./validate-umrah-inbound'),
    validateUmrahVisa: require('./validate-umrah-visa'),
    validateUmrahTransportation: require('./validate-umrah-transportation'),
    validateUmrahZiyarah: require('./validate-umrah-ziyarah'),
    validateDayWiseItineraryThumbnails: require('./validate-day-wise-itinerary-thumbnails'),
    validateUmrahDayWiseItinerary: require('./validate-umrah-day-wise-itinerary'),
    validateUmrahThumbnail: require('./validate-umrah-thumbnail'),
    validateUmrah: require('./validate-umrah'),
    validateTermsAndConditions: require('./validate-terms-and-conditions'),
};
