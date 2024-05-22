/**
 * @file /controllers/settings/site/general/getGeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');

// export get general settings controller
module.exports = async (req, res, next) => {
    try {
        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // return response
        return res.status(200).json({
            message: 'Fetched general settings successfully',
            generalSettings,
        });
    } catch (error) {
        return next(error);
    }
};
