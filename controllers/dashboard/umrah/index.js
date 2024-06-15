/**
 * @file controllers/dashboard/umrah/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// export all umrah controllers
module.exports = {
    viewUmrahBooking: require('./view-umrah-booking'),
    viewUmrahTypes: require('./view-umrah-types'),
    viewUmrahDurations: require('./view-umrah-durations'),
    viewUmrahPackages: require('./view-umrah-packages'),
    viewAddUmrahPackage: require('./view-add-umrah-package'),
    viewEditUmrahPackage: require('./view-edit-umrah-package'),
};
