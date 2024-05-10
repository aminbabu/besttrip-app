/**
 * @file constants/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 10 May, 2024
 */

// export constants
module.exports = {
    ...require('./globals'),
    ...require('./media'),
    ...require('./xss-whitelist'),
    ...require('./users'),
    ...require('./customers'),
    ...require('./policies'),
    ...require('./payments'),
    ...require('./sections'),
    ...require('./exclusive-offers'),
    ...require('./hotel-offers'),
    ...require('./flight-offers'),
    ...require('./umrah-offers'),
    ...require('./blog-posts'),
    ...require('./themes'),
    ...require('./payment-requests'),
    ...require('./umrah-pacakges'),
    ...require('./umrah-package-durations'),
    ...require('./umrah-package-types'),
    ...require('./visa'),
};
