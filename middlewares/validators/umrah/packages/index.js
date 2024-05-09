/**
 * @file /middlewares/validators/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 09 May, 2024
 */

// export umrah package validators
module.exports = {
    validateUmrahPackageTumbnail: require('./validate-umrah-package-tumbnail'),
    validateUmrahPackageGallery: require('./validate-umrah-package-gallery'),
    validateMakkahHotelTumbnail: require('./validate-makkah-hotel-tumbnail'),
    validateMakkahHotelGallery: require('./validate-makkah-hotel-gallery'),
    validateMadinahHotelTumbnail: require('./validate-madinah-hotel-tumbnail'),
    validateMadinahHotelGallery: require('./validate-madinah-hotel-gallery'),
    validateUmrahPackageThumbnail: require('./validate-umrah-package-thumbnail'),
    validateUmrahPackageId: require('./validate-umrah-package-id'),
    validateUmrahPackage: require('./validate-umrah-package'),
};
