/**
 * @file controllers/users/view-user-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const moment = require('moment');

// export user profile view controller
module.exports = async (req, res) => {
    try {
        // get user
        const { user } = req;

        // format datetime
        user.createdAt = moment(user.createdAt).format('DD MMM YYYY, hh:mm a');
        user.updatedAt = moment(user.updatedAt).format('DD MMM YYYY, hh:mm a');

        // return user profile
        return res.render('users/profile', {
            title: 'User Profile',
            user,
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
