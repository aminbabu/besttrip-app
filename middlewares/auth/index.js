/**
 * @file /middlewares/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 26 May, 2024
 */

// export all middlewares
module.exports = {
    isApiValid: require('./is-api-valid'),
    isAuthorized: require('./is-authorized'),
    isNotAuthorized: require('./is-not-authorized'),
    isVerified: require('./is-verified'),
    isAllowed: require('./is-allowed'),
};
