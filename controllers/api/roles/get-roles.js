/**
 * @file controllers/api/roles/get-roles.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { Role } = require('../../../models');

// export get roles controller
module.exports = async (req, res, next) => {
    try {
        // get roles
        const roles = await Role.find();

        // return response
        return res.status(200).json({
            message: 'Fetched roles successfully',
            roles,
        });
    } catch (error) {
        return next(error);
    }
};
