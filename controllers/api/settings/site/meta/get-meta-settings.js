/**
 * @file /controllers/api/settings/site/meta/get-meta-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { MetaSettings } = require('../../../../../models');

// export get meta settings controller
module.exports = async (req, res, next) => {
    try {
        // get meta settings
        const metaSettings = await MetaSettings.find();

        // return response
        return res.status(200).json({
            message: 'Fetched meta settings successfully',
            metaSettings,
        });
    } catch (error) {
        return next(error);
    }
};
