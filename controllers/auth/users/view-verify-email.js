/**
 * @file /controllers/api/auth/users/view-verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export verify email view controller
module.exports = (req, res) => {
    try {
        // return verify email page
        return res.render('auth/verify-email', {
            title: 'Verify Email',
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
