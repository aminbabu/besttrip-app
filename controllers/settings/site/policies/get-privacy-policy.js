/**
 * @file /controllers/settings/site/policies/get-privacy-policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { PoliciesSettings } = require('../../../../models');

// export get privacy policy controller
module.exports = async (req, res, next) => {
    try {
        // get privacy policy content
        const content = await PoliciesSettings.findOne({
            key: 'privacy-policy',
        });

        // check if privacy policy exists
        if (!content) {
            return res.status(404).json({
                message: 'Privacy policy not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched privacy policy successfully',
            content,
        });
    } catch (error) {
        return next(error);
    }
};
