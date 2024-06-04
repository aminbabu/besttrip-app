/**
 * @file /controllers/api/settings/content/sections/get-section.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { SectionSettings } = require('../../../../../models');

// export get content section controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { key } = req.params;

        // get section
        const section = await SectionSettings.findOne({ key });

        // check if section exists
        if (!section) {
            return res.status(404).json({
                message: 'Content section not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched content section successfully',
            section,
        });
    } catch (error) {
        return next(error);
    }
};
