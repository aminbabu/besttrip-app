/**
 * @file /controllers/settings/content/sections/update-or-create-section.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { ContentSectionsSettings } = require('../../../../models');

// export update/create content section settings controller
module.exports = async (req, res, next) => {
    try {
        // get section id
        const { section, title, description } = req.body;

        // get section
        let existingSection = await ContentSectionsSettings.findById(section);

        // check if section exists
        if (existingSection) {
            section.set({
                title,
                description,
            });
        } else {
            existingSection = new ContentSectionsSettings({
                title,
                description,
            });
        }

        // save section
        await existingSection.save();

        // return response
        return res.status(200).json({
            message: 'Updated content section settings successfully',
            section: existingSection,
        });
    } catch (error) {
        return next(error);
    }
};
