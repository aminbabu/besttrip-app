/**
 * @file /controllers/settings/site/general/getGeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');

// get general site settings controller
module.exports = async (req, res, next) => {
    try {
        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // check if general settings exists
        if (!generalSettings) {
            return res.status(404).json({
                message: 'General settings not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'General settings fetched successfully',
            generalSettings,
        });
    } catch (error) {
        return next(error);
    }
};
