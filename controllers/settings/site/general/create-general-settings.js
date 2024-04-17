/**
 * @file /controllers/settings/site/general/create-general-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');

// export general settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;
        const { logo, favicon } = req.files;

        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // check if general settings exists
        if (generalSettings) {
            return res.status(400).json({
                message: 'General settings already exists',
            });
        }

        // create general settings
        const newGeneralSettings = new GeneralSettings({
            ...validatedData,
            logo: logo.path,
            favicon: favicon.path,
        });

        // return response
        return res.status(201).json({
            message: 'Created general settings successfully',
            generalSettings: newGeneralSettings,
        });
    } catch (error) {
        return next(error);
    }
};
