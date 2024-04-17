/**
 * @file /controllers/settings/site/meta/get-meta-setting-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { MetaSettings } = require('../../../../models');

// export get meta setting by id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.body;

        // get meta setting by id
        const metaSetting = await MetaSettings.findById(id);

        // check if meta setting exists
        if (!metaSetting) {
            return res.status(404).json({
                message: 'Meta setting not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched meta setting successfully',
            metaSetting,
        });
    } catch (error) {
        return next(error);
    }
};
