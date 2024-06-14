/**
 * @file controllers/api/roles/delete-role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { Role } = require('../../../models');

// export delete role controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // find role
        const role = await Role.findById(id);

        // delete role
        role.deleteOne();

        // return response
        return res.status(200).json({
            message: 'Deleted role successfully',
            role,
        });
    } catch (error) {
        return next(error);
    }
};
