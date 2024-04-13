/**
 * @file /controllers/settings/site/contact/getContactSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { ContactSettings } = require('../../../../models');

// get contact settings controller
module.exports = async (req, res, next) => {
    try {
        // get contact settings
        const contactSettings = await ContactSettings.findOne();

        // check if contact settings exists
        if (!contactSettings) {
            return res.status(404).json({
                message: 'Contact settings not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched contact settings successfully',
            contactSettings,
        });
    } catch (error) {
        return next(error);
    }
};
