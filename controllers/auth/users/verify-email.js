/**
 * @file /controllers/auth/users/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
 */

// export verify-email view controller
module.exports = async (req, res) => {
    try {
        // render verify-email view
        return res.render('auth/users/verify-email');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
