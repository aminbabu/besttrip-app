/**
 * @file middlewares/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 10 May, 2024
 */

// export umrah package file upload middlewares
module.exports = {
    uploadPackageThumbnail: require('./upload-umrah-package-thumbnail'),
    uploadPackageGallery: require('./upload-umrah-package-gallery'),
    uploadPackageMakkaHotelThumbnail: require('./upload-makka-hotel-thumbnail'),
    uploadPackageMakkaHotelGallery: require('./upload-makka-hotel-gallery'),
    uploadPackageMadinahHotelThumbnail: require('./upload-madinah-hotel-thumbnail'),
    uploadPackageMadinahHotelGallery: require('./upload-madinah-hotel-gallery'),
    uploadPackageUmrahPackageThumbnail: require('./upload-umrah-thumbnail'),
};
