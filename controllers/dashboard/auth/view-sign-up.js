/**
 * @file controllers/dashboard/auth/view-sign-up.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export sign-up view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/sign-up', {
            title: 'Sign Up',
            message:
                'Please enter your details to create an account. We will send you a verification email.',
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
