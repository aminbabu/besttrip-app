/**
 * @file /models/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 29 March, 2024
 */

// export all models
module.exports = {
    User: require('./user'),
    Token: require('./token'),
    Customer: require('./customer'),
    GeneralSettings: require('./settings/site/GeneralSettings'),
};
