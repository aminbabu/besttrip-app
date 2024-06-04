/**
 * @file controllers/dashboard/auth/view-reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export reset-password view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/reset-password', {
            title: 'Reset Password',
            message:
                'Please enter your new password. Your password must be at least 6 characters long.',
            token: req.params.token,
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
