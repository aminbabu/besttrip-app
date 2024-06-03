/**
 * @file /controllers/auth/users/forgot-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
 */

// export forgot-password view controller
module.exports = async (req, res) => {
    try {
        // render forgot-password view
        return res.render('auth/users/forgot-password');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
