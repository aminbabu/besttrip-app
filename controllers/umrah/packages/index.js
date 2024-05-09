/**
 * @file /controllers/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// export all umrah packages controllers
module.exports = {
    getUmrahPackages: require('./get-umrah-packges'),
    getUmrahPackage: require('./get-umrah-package'),
    createUmrahPackage: require('./create-umrah-package'),
    updateUmrahPackage: require('./update-umrah-package'),
    deleteUmrahPackage: require('./delete-umrah-package'),
};
