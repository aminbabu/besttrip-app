/**
 * @file /controllers/api/settings/site/meta/delete-meta-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { MetaSettings } = require('../../../../../models');

// export delete meta settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // find meta settings by id and delete
        const metaSetting = await MetaSettings.findById(id);

        // check if meta settings not found
        if (!metaSetting) {
            return res.status(404).json({
                message: 'Meta settings not found',
            });
        }

        // delete meta settings
        await metaSetting.deleteOne();

        // return response
        return res.status(200).json({
            message: 'Deleted meta settings successfully',
            metaSetting,
        });
    } catch (error) {
        return next(error);
    }
};
