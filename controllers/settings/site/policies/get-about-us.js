/**
 * @file /controllers/settings/site/policies/get-about-us.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { PoliciesSettings } = require('../../../../models');

// export get about us controller
module.exports = async (req, res, next) => {
    try {
        // get about us content
        const content = await PoliciesSettings.findOne({
            key: 'about-us',
        });

        // check if about us exists
        if (!content) {
            return res.status(404).json({
                message: 'About us not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched about us successfully',
            content,
        });
    } catch (error) {
        return next(error);
    }
};
