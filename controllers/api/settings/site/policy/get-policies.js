/**
 * @file /controllers/settings/site/policy/get-policies.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { PolicySettings } = require('../../../../../models');

// export get policies controller
module.exports = async (req, res, next) => {
    try {
        // get policies
        const policies = await PolicySettings.find();

        // return response
        return res.status(200).json({
            message: 'Fetched policies successfully',
            policies,
        });
    } catch (error) {
        return next(error);
    }
};
