/**
 * @file /middlewares/validators/settings/site/general/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 13 April, 2024
 */

// export all settings validators
module.exports = {
    validateGeneralSettings: require('./validate-general-settings'),
    validateGeneralSettingsFiles: require('./validate-general-settings-files'),
};
