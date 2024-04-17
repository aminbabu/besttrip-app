/**
 * @file /controllers/settings/site/policy/create-policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { PolicySettings } = require('../../../../models');

// export create policy controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { key, content } = req.body;

        // check if policy exists
        const policy = await PolicySettings.findOne({ key });

        // check if policy exists
        if (policy) {
            return res.status(400).json({
                message: `Policy with key - ${key.split('-').join(' ')} already exists`,
            });
        }

        // create policy
        const newPolicy = await PolicySettings.create({ key, content });

        // return response
        return res.status(201).json({
            message: `Created ${key.split('-').join(' ')} successfully`,
            policy: newPolicy,
        });
    } catch (error) {
        return next(error);
    }
};
