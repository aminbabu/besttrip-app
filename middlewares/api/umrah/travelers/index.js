/**
 * @file middlewares/api/umrah/travelers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 14 May, 2024
 */

// export travelers file upload middlewares
module.exports = {
    uploadTravelerPhoto: require('./upload-traveler-photo'),
    uploadTravelerPassport: require('./upload-traveler-passport'),
    uploadTravelerNID: require('./upload-traveler-nid'),
    uploadTravelerCovidCertificate: require('./upload-traveler-covid-certificate'),
};
