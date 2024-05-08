/**
 * @file /controllers/settings/themes/update-or-create-theme.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { ThemeSettings } = require('../../../models');

// export update/create theme controller
module.exports = async (req, res, next) => {
    try {
        let isUpdated = false;

        // get validated data
        const { theme: key } = req.params;
        const { title, description } = req.body;
        const { illustration } = req.files;

        // get theme
        let theme = await ThemeSettings.findOne({ key });

        // check if theme exists
        if (theme) {
            theme.set({
                illustration: illustration?.path || theme.illustration,
                title,
                description,
            });
            isUpdated = true;
        } else {
            theme = new ThemeSettings({
                theme: key,
                illustration: illustration?.path,
                title,
                description,
            });
        }

        // save theme
        await theme.save();

        // return response
        return res.status(200).json({
            message: `${isUpdated ? 'Updated' : 'Created'} theme successfully`,
            theme,
        });
    } catch (error) {
        return next(error);
    }
};
