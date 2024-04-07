/**
 * @file /utils/global/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// export all global utils
module.exports = {
    generateToken: require('./generate-token'),
    comparePassword: require('./compare-password'),
    verifyToken: require('./verify-token'),
    formDataParser: require('./form-data-parser'),
    removeMedia: require('./remove-media'),
};
