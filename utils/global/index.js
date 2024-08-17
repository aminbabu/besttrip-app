/**
 * @file /utils/global/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 22 June, 2024
 */

// export all global utils
module.exports = {
    generateToken: require('./generate-token'),
    comparePassword: require('./compare-password'),
    generateRandomCode: require('./generate-random-code'),
    verifyToken: require('./verify-token'),
    ipInfo: require('./ipinfo'),
    currencyFormatter: require('./currency-formatter'),
    prepareRoleDefination: require('./prepare-role-defination'),
};
