/**
 * @file constants/express-fileupload.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 12 April, 2024
 */

const { MAX_FILE_SIZE } = require('./globals');

// express-fileupload configuration
module.exports = {
    LIMIT: MAX_FILE_SIZE,
};
