/**
 * @file /controllers/settings/site/general/updateGeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');
const { filterEmptyFields } = require('../../../../utils');

// update general settings
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = filterEmptyFields(req);
        const { logo, favicon } = req.files;

        // find the existing general settings
        let generalSettings = await GeneralSettings.findOne();

        // if no settings found, create new settings
        if (!generalSettings) {
            generalSettings = new GeneralSettings({
                ...validatedData,
                logo: logo.path,
                favicon: favicon.path,
            });
        } else {
            // update existing settings
            generalSettings.set({
                ...validatedData,
                logo: logo?.path || generalSettings.logo,
                favicon: favicon?.path || generalSettings.favicon,
            });
        }

        // save the updated or new general settings
        const updatedGeneralSettings = await generalSettings.save();

        // return success response
        return res.status(200).json({
            message: 'General settings updated successfully',
            generalSettings: updatedGeneralSettings,
        });
    } catch (error) {
        return next(error);
    }
};
