/**
 * @file /controllers/settings/site/policies/get-return-policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { PoliciesSettings } = require('../../../../models');

// export get return policy controller
module.exports = async (req, res, next) => {
    try {
        // get return policy content
        const content = await PoliciesSettings.findOne({
            key: 'return-policy',
        });

        // check if return policy exists
        if (!content) {
            return res.status(404).json({
                message: 'Return policy not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched return policy successfully',
            content,
        });
    } catch (error) {
        return next(error);
    }
};
