/**
 * @file /controllers/api/auth/users/view-forgot-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export forgot password view controller
module.exports = (req, res) => {
    try {
        // return forgot password page
        return res.render('auth/forgot-password', {
            title: 'Forgot Password',
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
