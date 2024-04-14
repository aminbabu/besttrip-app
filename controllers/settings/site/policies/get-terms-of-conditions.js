/**
 * @file /controllers/settings/site/policies/get-terms-of-conditions.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { PoliciesSettings } = require('../../../../models');

// export get terms of conditions controller
module.exports = async (req, res, next) => {
    try {
        // get terms of conditions content
        const content = await PoliciesSettings.findOne({
            key: 'terms-of-conditions',
        });

        // check if terms of conditions exists
        if (!content) {
            return res.status(404).json({
                message: 'Terms of conditions not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched terms of conditions successfully',
            content,
        });
    } catch (error) {
        return next(error);
    }
};
