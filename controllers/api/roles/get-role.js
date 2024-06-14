/**
 * @file controllers/api/roles/get-role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { Role } = require('../../../models');

// export get role controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get role
        const role = await Role.findById(id);

        // return response
        return res.status(200).json({
            message: 'Fetched role successfully',
            role,
        });
    } catch (error) {
        return next(error);
    }
};
