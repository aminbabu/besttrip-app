/**
 * @file controllers/dashboard/auth/view-sign-up.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { countries } = require('countries-list');
const { User } = require('../../../models');

// export sign-up view controller
module.exports = async (req, res) => {
    try {
        // find at least an admin user
        const user = await User.findOne({ role: 'admin' });

        // check if user is not exists
        if (user) {
            return res.redirect('/dashboard/auth/login');
        }

        // return render sign up view
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
