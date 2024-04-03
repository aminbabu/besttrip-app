/**
 * @file /middlewares/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// export all middlewares
module.exports = {
    isAuthorized: require('./is-authorized'),
    isVerified: require('./is-verified'),
    isAllowed: require('./is-allowed'),
    isSelf: require('./customers/is-self'),
};
