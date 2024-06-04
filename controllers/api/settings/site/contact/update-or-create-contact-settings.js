/**
 * @file /controllers/api/settings/site/contact/update-or-create-contact-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { ContactSettings } = require('../../../../../models');

// export update/create contact settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // find the existing contact settings
        let contactSettings = await ContactSettings.findOne();

        // check if contact settings exists
        if (contactSettings) {
            contactSettings.set(validatedData);
        } else {
            contactSettings = new ContactSettings(validatedData);
        }

        // save contact settings
        await contactSettings.save();

        // return response
        return res.status(200).json({
            message: 'Updated contact settings successfully',
            contactSettings,
        });
    } catch (error) {
        return next(error);
    }
};
