/**
 * @file constants/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 17 April, 2024
 */

// export constants
module.exports = {
    ...require('./globals'),
    ...require('./media'),
    ...require('./xss-whitelist'),
    ...require('./users'),
    ...require('./customers'),
    ...require('./policy'),
    ...require('./payments'),
};
