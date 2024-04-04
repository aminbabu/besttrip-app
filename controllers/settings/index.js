/**
 * @file /controllers/settings/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// export all settings controllers
module.exports = {
    getGeneralSettings: require('./site/general/getGeneralSettings'),
    updateGeneralSettings: require('./site/general/updateGeneralSettings'),
};
