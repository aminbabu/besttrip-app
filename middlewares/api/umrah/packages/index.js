/**
 * @file middlewares/api/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 14 May, 2024
 */

// export umrah package file upload middlewares
module.exports = {
    uploadPackageThumbnail: require('./upload-umrah-package-thumbnail'),
    uploadPackageGallery: require('./upload-umrah-package-gallery'),
    uploadMakkahHotelThumbnail: require('./upload-makka-hotel-thumbnail'),
    uploadMakkahHotelGallery: require('./upload-makka-hotel-gallery'),
    uploadMadinahHotelThumbnail: require('./upload-madinah-hotel-thumbnail'),
    uploadMadinahHotelGallery: require('./upload-madinah-hotel-gallery'),
    uploadUmrahDayWiseItineraryThumbnails: require('./upload-umrah-day-wise-itinerary-thumbnails'),
    uploadUmrahThumbnail: require('./upload-umrah-thumbnail'),
};
