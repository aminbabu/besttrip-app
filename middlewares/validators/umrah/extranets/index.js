/**
 * @file /middlewares/validators/umrah/extranets/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 04 May, 2024
 */

// export umrah extranet validators
module.exports = {
    validateUmrahExtranetTumbnail: require('./validate-umrah-extranet-tumbnail'),
    validateUmrahExtranetGallery: require('./validate-umrah-extranet-gallery'),
    validateMakkahHotelTumbnail: require('./validate-makkah-hotel-tumbnail'),
    validateMakkahHotelGallery: require('./validate-makkah-hotel-gallery'),
    validateMadinahHotelTumbnail: require('./validate-madinah-hotel-tumbnail'),
    validateMadinahHotelGallery: require('./validate-madinah-hotel-gallery'),
    validateUmrahPackageThumbnail: require('./validate-umrah-package-thumbnail'),
    validateUmrahExtranetId: require('./validate-umrah-extranet-id'),
    validateUmrahExtranet: require('./validate-umrah-extranet'),
};
