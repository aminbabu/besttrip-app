/**
 * @file /controllers/settings/site/general/update-or-create-general-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');

// export update/create general settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;
        const { logo, favicon } = req.files;

        // find the existing general settings
        let generalSettings = await GeneralSettings.findOne();

        // check if general settings exists
        if (generalSettings) {
            generalSettings.set({
                ...validatedData,
                logo: logo?.path || generalSettings.logo,
                favicon: favicon?.path || generalSettings.favicon,
            });
        } else {
            generalSettings = new GeneralSettings({
                ...validatedData,
                logo: logo?.path,
                favicon: favicon?.path,
            });
        }

        // save general settings
        await generalSettings.save();

        // return response
        return res.status(200).json({
            message: 'Updated general settings successfully',
            generalSettings,
        });
    } catch (error) {
        return next(error);
    }
};
