/**
 * @file /middlewares/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 May, 2024
 * @update_date 27 May, 2024
 */

// export all middlewares
module.exports = {
    isAuthorized: require('./is-authorized'),
    isNotAuthorized: require('./is-not-authorized'),
    isNotAllowed: require('./is-not-allowed'),
};
