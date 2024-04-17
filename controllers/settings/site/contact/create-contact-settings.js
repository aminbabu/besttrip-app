/**
 * @file /controllers/settings/site/contact/create-contact-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { ContactSettings } = require('../../../../models');

// export create contact settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // get existing contact settings
        const existingContactSettings = await ContactSettings.findOne();

        // check if contact settings exists
        if (existingContactSettings) {
            return res.status(400).json({
                message: 'Contact settings already exists',
            });
        }

        // create contact settings
        const contactSettings = new ContactSettings(validatedData);

        // save contact settings
        await contactSettings.save();

        // return response
        return res.status(201).json({
            message: 'Created contact settings successfully',
            contactSettings,
        });
    } catch (error) {
        return next(error);
    }
};
