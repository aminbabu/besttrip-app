/**
 * @file /controllers/users/get-user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const { User } = require('../../models');

// export get user view controller
module.exports = async (req, res) => {
    try {
        // get validated data
        const { id } = req.params;

        // get user
        const user = await User.findById(id);

        // check if user exists
        if (!user) {
            return res.redirect('/errors/404');
        }

        // return rendered user
        return res.render('users/profile', { user });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
