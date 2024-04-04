/**
 * @file /controllers/settings/site/general/updateGeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');

// update general settings
module.exports = async (req, res, next) => {
    try {
        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // update general settings
        const updatedGeneralSettings = await GeneralSettings.findByIdAndUpdate(
            generalSettings?._id,
            req.body,
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            }
        );

        // response
        return res.status(200).json({
            message: 'General settings updated successfully',
            generalSettings: updatedGeneralSettings,
        });
    } catch (error) {
        return next(error);
    }
};
