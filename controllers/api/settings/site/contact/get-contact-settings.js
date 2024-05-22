/**
 * @file /controllers/settings/site/contact/getContactSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { ContactSettings } = require('../../../../../models');

// export get contact settings controller
module.exports = async (req, res, next) => {
    try {
        // get contact settings
        const contactSettings = await ContactSettings.findOne();

        // return response
        return res.status(200).json({
            message: 'Fetched contact settings successfully',
            contactSettings,
        });
    } catch (error) {
        return next(error);
    }
};
