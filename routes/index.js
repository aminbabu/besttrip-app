/**
 * @file /routes/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

// export all routes
module.exports = {
    usersAuthRouter: require('./auth/users'),
    customersAuthRouter: require('./auth/customers'),
    customersRouter: require('./customers'),
    settingsRouter: require('./settings'),
};
