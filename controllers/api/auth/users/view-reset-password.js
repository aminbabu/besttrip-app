/**
 * @file /controllers/api/auth/users/view-reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export reset password view controller
module.exports = (req, res) => {
    try {
        // return reset password page
        return res.render('auth/reset-password', {
            title: 'Reset Password',
            token: req.params.token,
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
