/**
 * @file /controllers/api/settings/site/policy/update-policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const { PolicySettings } = require('../../../../../models');

// export update policy controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // find the existing policy settings
        let policySettings = await PolicySettings.findOne();

        // check if policy settings exists
        if (policySettings) {
            policySettings.set(validatedData);
        } else {
            policySettings = new PolicySettings(validatedData);
        }

        // save policy settings
        await policySettings.save();

        // return response
        return res.status(200).json({
            message: 'Updated policy settings successfully',
            policySettings,
        });
    } catch (error) {
        return next(error);
    }
};
