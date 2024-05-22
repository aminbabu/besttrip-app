/**
 * @file /controllers/settings/site/meta/create-meta-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { MetaSettings } = require('../../../../models');

// export create meta settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { name, content } = req.body;

        // get existing meta settings
        const existingMetaSetting = await MetaSettings.findOne({ name });

        // check if meta settings exists
        if (existingMetaSetting) {
            return res.status(400).json({
                message: 'Meta settings already exists with the same name',
            });
        }

        // create meta settings
        const metaSetting = new MetaSettings({ name, content });

        // save meta settings
        await metaSetting.save();

        // return response
        return res.status(201).json({
            message: 'Created meta settings successfully',
            metaSetting,
        });
    } catch (error) {
        return next(error);
    }
};
