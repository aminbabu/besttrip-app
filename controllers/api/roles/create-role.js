/**
 * @file controllers/api/roles/create-role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { Role } = require('../../../models');

// export create role controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { name, description, permissions } = req.body;

        // create role
        const role = new Role({
            name,
            description,
            permissions,
        });

        // save role
        await role.save();

        // return response
        return res.status(200).json({
            message: 'Created role successfully',
            role,
        });
    } catch (error) {
        return next(error);
    }
};
