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
    isCustomerAuthorized: require('./is-customer-authorized'),
    isUserAuthorized: require('./is-user-authorized'),
    isUserNotAuthorized: require('./is-user-not-authorized'),
    isAllowed: require('./is-allowed'),
};
