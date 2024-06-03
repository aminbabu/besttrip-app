/**
 * @file controllers/users/view-user-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export user profile view controller
module.exports = async (req, res) => {
    try {
        // get user
        const { user } = req;

        // return user profile
        return res.render('users/profile', {
            title: 'User Profile',
            user,
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
