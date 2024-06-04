/**
 * @file /controllers/api/auth/users/view-resend-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export resend verification email view controller
module.exports = (req, res) => {
    try {
        // return resend verification email page
        return res.render('auth/resend-verification-email', {
            title: 'Resend Verification Email',
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
