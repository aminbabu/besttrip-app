/**
 * @file /controllers/api/umrah/package-durations/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// export umrah package durations controllers
module.exports = {
    getUmrahPackageDurations: require('./get-umrah-package-durations'),
    getUmrahPackageDurationsCustomer: require('./get-umrah-package-durations-customer'),
    getUmrahPackageDuration: require('./get-umrah-package-duration'),
    createUmrahPackageDuration: require('./create-umrah-package-duration'),
    updateUmrahPackageDurationStatus: require('./update-umrah-package-duration-status'),
    updateUmrahPackageDuration: require('./update-umrah-package-duration'),
    deleteUmrahPackageDuration: require('./delete-umrah-package-duration'),
};
