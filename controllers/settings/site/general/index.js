/**
 * @file /controllers/settings/site/general/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 16 April, 2024
 */

// export general settings controllers
module.exports = {
    getGeneralSettings: require('./get-general-settings'),
    createGeneralSettings: require('./create-general-settings'),
    updateGeneralSettings: require('./update-general-settings'),
};
