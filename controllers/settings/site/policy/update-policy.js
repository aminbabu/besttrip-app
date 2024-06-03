/**
 * @file /controllers/api/settings/site/policy/update-policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { PolicySettings } = require('../../../../models');

// export update policy controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { key } = req.params;
        const { content } = req.body;

        // check if policy exists
        const policy = await PolicySettings.findOne({ key });

        // check if policy exists
        if (!policy) {
            return res.status(404).json({
                message: `No ${key.split('-').join(' ')} found`,
            });
        }

        // update policy
        policy.set({ content });

        // save policy
        await policy.save();

        // return response
        return res.status(200).json({
            message: `Updated ${key.split('-').join(' ')} successfully`,
            policy,
        });
    } catch (error) {
        return next(error);
    }
};
