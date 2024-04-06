/**
 * @file /controllers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 March, 2024
 * @update_date 29 March, 2024
 */

// export all controllers
module.exports = {
    auth: require('./auth/user'),
    customers: require('./customers'),
    wallet: require('./wallet'),
};
