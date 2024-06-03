/**
 * @file /controllers/auth/users/send-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
 */

// export send-verification-email view controller
module.exports = async (req, res) => {
    try {
        // render send-verification-email view
        return res.render('auth/users/send-verification-email');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
