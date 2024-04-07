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
    env: require('./env'),
    generateToken: require('./generate-token'),
    comparePassword: require('./compare-password'),
    verifyToken: require('./verify-token'),
    uploadMedia: require('./upload-media'),
    removeMedia: require('./remove-media'),
};
