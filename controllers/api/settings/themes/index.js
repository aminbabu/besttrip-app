/**
 * @file /controllers/api/settings/themes/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 19 Aug, 2024
 */

// export theme settings controllers
module.exports = {
    getThemes: require('./get-themes'),
    getTheme: require('./get-theme'),
    updateThemeStatus: require('./update-theme-status'),
    updateOrCreateTheme: require('./update-or-create-theme'),
};
