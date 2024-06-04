/**
 * @file /middlewares/api/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 03 June, 2024
 */

// export all middlewares
module.exports = {
    isAuthorized: require('./is-authorized'),
    isUserNotAuthorized: require('./is-not-authorized'),
    isAllowed: require('./is-allowed'),
    isUserAuthorized: require('./is-user-authorized'),
};
