/**
 * @file middlewares/umrah/extranets/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 04 May, 2024
 */

// export umrah extranet file upload middlewares
module.exports = {
    uploadExtranetThumbnail: require('./upload-extranet-thumbnail'),
    uploadExtranetGallery: require('./upload-extranet-gallery'),
    uploadExtranetMakkaHotelThumbnail: require('./upload-extranet-makka-hotel-thumbnail'),
    uploadExtranetMakkaHotelGallery: require('./upload-extranet-makka-hotel-gallery'),
    uploadExtranetMadinahHotelThumbnail: require('./upload-extranet-madinah-hotel-thumbnail'),
    uploadExtranetMadinahHotelGallery: require('./upload-extranet-madinah-hotel-gallery'),
    uploadExtranetUmrahPackageThumbnail: require('./upload-extranet-umrah-package-thumbnail'),
};
