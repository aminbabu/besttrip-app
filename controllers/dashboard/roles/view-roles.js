/**
 * @file controllers/dashboard/roles/view-roles.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { Role } = require('../../../models');

// export roles view controller
module.exports = async (req, res, next) => {
    try {
        // get roles
        const roles = await Role.find();

        // return render view
        return res.render('dashboard/roles', {
            title: 'Roles',
            user: req.user,
            roles,
        });
    } catch (error) {
        return next(error);
    }
};
