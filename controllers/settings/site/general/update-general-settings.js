/**
 * @file /controllers/settings/site/general/updateGeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');

// export update general settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;
        const { logo, favicon } = req.files;

        // find the existing general settings
        const generalSettings = await GeneralSettings.findOne();

        // check if general settings exists
        if (!generalSettings) {
            return res.status(404).json({
                message: 'General settings not found',
            });
        }

        // update general settings
        generalSettings.set({
            ...validatedData,
            logo: logo?.path || generalSettings.logo,
            favicon: favicon?.path || generalSettings.favicon,
        });

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
