/**
 * @file /middlewares/api/validators/umrah/package-types/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// export umrah package type validators
module.exports = {
    validateUmrahPackageTypeId: require('./validate-umrah-package-type-id'),
    validateUmrahPackageTypeIds: require('./validate-umrah-package-type-ids'),
    validateUmrahPackageType: require('./validate-umrah-package-type'),
    validateUmrahPackageTypeStatus: require('./validate-umrah-package-type-status'),
};
