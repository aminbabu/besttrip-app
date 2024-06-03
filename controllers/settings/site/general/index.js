/**
 * @file /controllers/api/settings/site/general/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 19 April, 2024
 */

// export general settings controllers
module.exports = {
    getGeneralSettings: require('./get-general-settings'),
    updateOrCreateGeneralSettings: require('./update-or-create-general-settings'),
};
