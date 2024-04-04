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
        const generalSettings = await GeneralSettings.findOne();
        return res.status(200).json(generalSettings);
    } catch (error) {
        return next(error);
    }
};
