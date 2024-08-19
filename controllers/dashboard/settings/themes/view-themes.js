/**
 * @file controllers/dashboard/settings/themes/view-themes.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { ThemeSettings } = require('../../../../models');

// export themes view controller
module.exports = async (req, res) => {
    try {
        // get themes
        const themes = await ThemeSettings.find();

        const defaultTheme = themes?.find((item) => item?.theme === 'default');

        // render themes view
        return res.render('dashboard/settings/themes', {
            title: 'Themes',
            themes,
            defaultTheme,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
