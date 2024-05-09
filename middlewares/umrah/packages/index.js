/**
 * @file middlewares/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 09 May, 2024
 */

// export umrah package file upload middlewares
module.exports = {
    uploadExtranetThumbnail: require('./upload-umrah-package-thumbnail'),
    uploadExtranetGallery: require('./upload-umrah-package-gallery'),
    uploadExtranetMakkaHotelThumbnail: require('./upload-makka-hotel-thumbnail'),
    uploadExtranetMakkaHotelGallery: require('./upload-makka-hotel-gallery'),
    uploadExtranetMadinahHotelThumbnail: require('./upload-madinah-hotel-thumbnail'),
    uploadExtranetMadinahHotelGallery: require('./upload-madinah-hotel-gallery'),
    uploadExtranetUmrahPackageThumbnail: require('./upload-umrah-thumbnail'),
};
