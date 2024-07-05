/**
 * @file controllers/dashboard/auth/view-forgot-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export forgot-password view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/forgot-password', {
            title: 'Forgot Password',
            message:
                'Please enter your email address to receive a password reset link.',
        });
    } catch (err) {
        return res.redirect('/dashboard/errors/500');
    }
};
