/**
 * @file /config/ip-info.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

const { defaultIPSelector } = require('ipinfo-express');
const { IP_INFO_KEY } = require('./env');

// export ip info
module.exports = {
    token: IP_INFO_KEY,
    cache: null,
    timeout: 5000,
    ipSelector: defaultIPSelector,
};
