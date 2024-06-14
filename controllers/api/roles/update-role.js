/**
 * @file controllers/api/roles/update-role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { Role } = require('../../../models');

// export update role controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { name, description, permissions } = req.body;

        // update role
        const role = await Role.findById(id);

        // update role data
        role.set({
            name: name || role.name,
            description: description || role.description,
            permissions: permissions || role.permissions,
        });

        // save role
        await role.save();

        // return response
        return res.status(200).json({
            message: 'Updated role successfully',
            role,
        });
    } catch (error) {
        return next(error);
    }
};
