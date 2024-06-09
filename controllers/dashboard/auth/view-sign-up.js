/**
 * @file controllers/dashboard/auth/view-sign-up.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const { countries } = require('countries-list');

// export sign-up view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/sign-up', {
            title: 'Sign Up',
            message:
                'Please enter your details to create an account. We will send you a verification email.',
            countries: Object.values(countries),
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
