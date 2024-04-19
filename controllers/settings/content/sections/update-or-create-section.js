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
        const { key, title, description } = req.body;

        // get section
        let section = await ContentSectionsSettings.findOne({ key });

        // check if section exists
        if (section) {
            section.set({
                title,
                description,
            });
        } else {
            section = new ContentSectionsSettings({
                key,
                title,
                description,
            });
        }

        // save section
        await section.save();

        // return response
        return res.status(200).json({
            message: 'Updated content section settings successfully',
            section,
        });
    } catch (error) {
        return next(error);
    }
};
