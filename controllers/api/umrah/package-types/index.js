/**
 * @file /controllers/api/umrah/package-types/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// export umrah package types controllers
module.exports = {
    getUmrahPackageTypes: require('./get-umrah-package-types'),
    getUmrahPackageTypesCustomers: require('./get-umrah-package-types-customers'),
    getUmrahPackageType: require('./get-umrah-package-type'),
    createUmrahPackageType: require('./create-umrah-package-type'),
    updateUmrahPackageType: require('./update-umrah-package-type'),
    deleteUmrahPackageType: require('./delete-umrah-package-type'),
    deleteManyUmrahPackageType: require('./delete-many-umrah-package-type'),
    updateUmrahPackageTypeStatus: require('./update-umrah-package-type-status'),
};
