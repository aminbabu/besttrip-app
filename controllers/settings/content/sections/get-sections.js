/**
 * @file /controllers/settings/content/sections/get-sections.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { ContentSectionsSettings } = require('../../../../models');

// export get content sections settings controller
module.exports = async (req, res, next) => {
    try {
        // get all sections
        const sections = await ContentSectionsSettings.find();

        // return response
        return res.status(200).json({
            message: 'Fetched content sections successfully',
            sections,
        });
    } catch (error) {
        return next(error);
    }
};
