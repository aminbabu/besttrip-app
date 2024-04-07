/**
 * @file /controllers/settings/site/general/updateGeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');

// update general settings
module.exports = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.files);

        // find the existing general settings
        let generalSettings = await GeneralSettings.findOne();

        // if no settings found, create new settings
        if (!generalSettings) {
            generalSettings = new GeneralSettings(req.body);
        } else {
            // update existing settings
            generalSettings.set(req.body);
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
