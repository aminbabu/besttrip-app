/**
 * @file /middlewares/api/validators/settings/site/general/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 13 April, 2024
 */

// export general settings validators
module.exports = {
    validateGeneralSettings: require('./validate-general-settings'),
    validateGeneralSettingsFiles: require('./validate-general-settings-files'),
};
