/**
 * @file /controllers/auth/users/login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
 */

// export login view controller
module.exports = async (req, res) => {
    try {
        // render register view
        return res.render('auth/users/login');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
