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
module.exports = async (req, res) => {
    try {
        // send response
        res.json({ message: 'General settings updated successfully' });
    } catch (error) {
        // send response
        res.status(500).json({ message: error.message });
    }
};
