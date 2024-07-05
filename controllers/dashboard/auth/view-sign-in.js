/**
 * @file controllers/dashboard/auth/view-sign-in.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export sign-in view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/sign-in', {
            title: 'Sign In',
            message: 'Please enter your email and password to sign in.',
        });
    } catch (err) {
        return res.redirect('/dashboard/errors/500');
    }
};
