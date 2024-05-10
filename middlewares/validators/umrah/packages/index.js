/**
 * @file /middlewares/validators/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 10 May, 2024
 */

// export umrah package validators
module.exports = {
    validateUmrahPackageThumbnail: require('./validate-umrah-package-thumbnail'),
    validateUmrahPackageGallery: require('./validate-umrah-package-gallery'),
    validateMakkahHotelTumbnail: require('./validate-makkah-hotel-thumbnail'),
    validateMakkahHotelGallery: require('./validate-makkah-hotel-gallery'),
    validateMadinahHotelTumbnail: require('./validate-madinah-hotel-thumbnail'),
    validateMadinahHotelGallery: require('./validate-madinah-hotel-gallery'),
    validateUmrahThumbnail: require('./validate-umrah-thumbnail'),
    validateUmrahPackageId: require('./validate-umrah-package-id'),
    validateUmrahPackage: require('./validate-umrah-package'),
};
