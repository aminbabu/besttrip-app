/**
 * @file /controllers/api/settings/themes/get-themes.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { ThemeSettings } = require('../../../../models');

// export get themes controller
module.exports = async (req, res, next) => {
    try {
        // get all themes
        const themes = await ThemeSettings.find();

        // return response
        return res.status(200).json({
            message: 'Fetched themes successfully',
            themes,
        });
    } catch (error) {
        return next(error);
    }
};
