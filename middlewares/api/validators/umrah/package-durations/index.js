/**
 * @file /middlewares/api/validators/umrah/package-durations/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// export umrah package duration validators
module.exports = {
    validateUmrahPackageDurationId: require('./validate-umrah-package-duration-id'),
    validateUmrahPackageDurationStatus: require('./validate-umrah-package-duration-status'),
    validateUmrahPackageDuration: require('./validate-umrah-package-duration'),
};
