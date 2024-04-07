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
        // Find the existing general settings
        let generalSettings = await GeneralSettings.findOne();

        // If no settings found, create new settings
        if (!generalSettings) {
            generalSettings = new GeneralSettings(req.body);
        } else {
            // Update existing settings
            generalSettings.set(req.body);
        }

        // Save the updated or new general settings
        const updatedGeneralSettings = await generalSettings.save();

        // Return success response
        return res.status(200).json({
            message: 'General settings updated successfully',
            generalSettings: updatedGeneralSettings,
        });
    } catch (error) {
        return next(error);
    }
};
