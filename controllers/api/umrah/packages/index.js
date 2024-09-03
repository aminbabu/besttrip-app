/**
 * @file /controllers/api/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// export all umrah packages controllers
module.exports = {
    getUmrahPackages: require('./get-umrah-packages'),
    getUmrahPackagesForCustomers: require('./get-umrah-packages-for-customers'),
    getUmrahPackage: require('./get-umrah-package'),
    getUmrahPackageCustomer: require('./get-umrah-package-customer'),
    createUmrahPackage: require('./create-umrah-package'),
    updateUmrahPackage: require('./update-umrah-package'),
    deleteUmrahPackage: require('./delete-umrah-package'),
    duplicatePackage: require('./duplicate-package'),
};
