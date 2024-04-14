/**
 * @file /controllers/settings/site/contact/updateContactSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { ContactSettings } = require('../../../../models');

// export update contact settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // find the existing contact settings
        let contactSettings = await ContactSettings.findOne();

        // if no settings found, create new settings
        if (!contactSettings) {
            contactSettings = new ContactSettings(validatedData);
        } else {
            // update existing settings
            contactSettings.set({
                ...contactSettings,
                ...validatedData,
            });
        }

        // save the updated or new contact settings
        const updatedContactSettings = await contactSettings.save();

        // return success response
        return res.status(200).json({
            message: 'Contact settings updated successfully',
            contactSettings: updatedContactSettings,
        });
    } catch (error) {
        return next(error);
    }
};
