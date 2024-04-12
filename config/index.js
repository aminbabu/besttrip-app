/**
 * @file /config/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// export all configurations
module.exports = {
    createDbConnection: require('./database'),
    env: require('./env'),
    expressFileUploadConf: require('./express-fileupload'),
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: true,
    preservePath: true,
};
