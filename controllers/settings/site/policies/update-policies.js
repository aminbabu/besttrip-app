/**
 * @file /controllers/settings/site/policies/update-policies.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { PoliciesSettings } = require('../../../../models');

// export update policies controller
module.exports = async (req, res, next) => {
    try {
        // get key from request body
        const { key, content } = req.body;

        // get policies settings by key
        let policies = await PoliciesSettings.findOne({ key });

        // check if policies exists
        if (!policies) {
            policies = new PoliciesSettings({
                key,
                content,
            });
        } else {
            policies.set({
                ...policies,
                content,
            });
        }

        // update policies
        await policies.save();

        // return response
        return res.status(200).json({
            message: 'Updated policies successfully',
            policies,
        });
    } catch (error) {
        return next(error);
    }
};
