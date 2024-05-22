/**
 * @file /controllers/api/settings/themes/get-theme.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { ThemeSettings } = require('../../../../models');

// export get theme controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { theme: key } = req.params;

        // get theme
        const theme = await ThemeSettings.findOne({ theme: key });

        // check if theme exists
        if (!theme) {
            return res.status(404).json({
                message: 'Theme not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched theme successfully',
            theme,
        });
    } catch (error) {
        return next(error);
    }
};
