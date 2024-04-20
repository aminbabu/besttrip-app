/**
 * @file /middlewares/validate/settings/themes/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// export theme validator middlewares
module.exports = {
    validateThemeSettingsKey: require('./validate-theme-settings-key'),
    validateThemeSettings: require('./validate-theme-settings'),
    validateThemeSettingsFile: require('./validate-theme-settings-file'),
};
