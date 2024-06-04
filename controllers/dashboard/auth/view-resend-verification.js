/**
 * @file controllers/dashboard/auth/view-resend-verification.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export resend-verification view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/resend-verification-email', {
            title: 'Resend Verification Email',
            message: 'Please enter your email address to receive a new verification link.',
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
