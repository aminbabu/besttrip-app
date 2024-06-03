/**
 * @file /controllers/api/auth/users/view-register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export register view controller
module.exports = (req, res) => {
    try {
        // return register page
        // return res.render('auth/register', {
        //     title: 'Registration',
        // });

        // return redirect to /login
        return res.redirect('/auth/users/login');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
