/**
 * @file /controllers/dashboard/users/view-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export profile view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/users/profile', {
            title: req.user.name,
            user: req.user,
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
