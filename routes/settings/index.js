/**
 * @file /routes/settings/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// export all routes
module.exports = {
    contentRouter: require('./content'),
    paymentRouter: require('./payments'),
    siteRouter: require('./site'),
    themeRouter: require('./themes'),
};
