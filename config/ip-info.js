/**
 * @file /config/ip-info.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

const { IP_INFO_KEY } = require('./env');

// ip info
const ipInfo = {
    token: IP_INFO_KEY,
    cache: null,
    timeout: 5000,
};

// export ip info
module.exports = { ipInfo };
