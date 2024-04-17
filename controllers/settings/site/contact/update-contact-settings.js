/**
 * @file /controllers/settings/site/contact/updateContactSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { ContactSettings } = require('../../../../models');

// export update contact settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // find the existing contact settings
        const contactSettings = await ContactSettings.findOne();

        // check if contact settings exists
        if (!contactSettings) {
            return res.status(404).json({
                message: 'Contact settings not found',
            });
        }

        // update contact settings
        contactSettings.set(validatedData);

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
