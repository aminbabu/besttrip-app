/**
 * @file /controllers/api/auth/users/view-login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export login view controller
module.exports = (req, res) => {
    try {
        // return sign in page
        return res.render('auth/login', {
            title: 'Sign In',
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
