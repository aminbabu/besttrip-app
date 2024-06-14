/**
 * @file controllers/dashboard/users/view-users.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { User } = require('../../../models');

// export users view controller
module.exports = async (req, res, next) => {
    try {
        // get users
        const users = await User.find();

        // return render view
        return res.render('dashboard/users', {
            title: 'Users',
            user: req.user,
            users,
        });
    } catch (error) {
        return next(error);
    }
};
