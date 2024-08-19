/**
 * @file /controllers/api/settings/themes/update-theme-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 Aug, 2024
 * @update_date 19 Aug, 2024
 */

// dependencies
const { ThemeSettings } = require('../../../../models');

// export update/create theme controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { theme: key } = req.params;

        // get theme
        const themes = await ThemeSettings.find();

        // find the theme to be activated
        const themeToActivate = themes.find((item) => item.theme === key);

        // check if the requested theme exists
        if (!themeToActivate) {
            return res.status(400).json({
                message: 'Theme is not found',
            });
        }

        // find the currently active theme
        const activeTheme = themes.find((item) => item.status === 'active');

        // deactivate the current active theme if it's not the same as the one to be activated
        if (activeTheme && activeTheme.theme !== key) {
            activeTheme.status = 'disabled';
            await activeTheme.save();
        }

        // activate the selected theme
        themeToActivate.status = 'active';
        await themeToActivate.save();

        // return response
        return res.status(200).json({
            message: 'Updated theme status successfully',
            theme: themeToActivate,
        });
    } catch (error) {
        return next(error);
    }
};
