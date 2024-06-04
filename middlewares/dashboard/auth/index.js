/**
 * @file /middlewares/dashboard/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export all middlewares
module.exports = {
    isAuthorized: require('./is-authorized'),
    isNotAuthorized: require('./is-not-authorized'),
    isAllowed: require('./is-allowed'),
};
