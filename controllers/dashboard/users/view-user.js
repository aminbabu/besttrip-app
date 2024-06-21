/**
 * @file /controllers/dashboard/users/view-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const moment = require('moment');
const { countries } = require('countries-list');
const { User } = require('../../../models');

// export profile view controller
module.exports = async (req, res) => {
    try {
        // validated data
        const { id } = req.params;

        // get user with login history
        const existingUser = await User.findById(id).populate('loginHistory');

        // convert user and login login history to object
        const user = existingUser.toObject();

        // format user dates
        user.createdAt = moment(user.createdAt).format('DD MMM YYYY, h:mm a');
        user.updatedAt = moment(user.updatedAt).format('DD MMM YYYY, h:mm a');

        // format login history
        user.loginHistory = user.loginHistory
            .map((history) => {
                const lastLogin = moment(history?.lastLogin).format('DD MMM YYYY, h:mm a');
                const lastLoginDaysAgo = moment(history?.lastLogin).fromNow();
                const location = history?.location
                    ? Object.values(history.location).filter(Boolean).join(', ')
                    : 'N/A';

                return {
                    ...history,
                    lastLogin,
                    lastLoginDaysAgo,
                    location,
                };
            })
            .sort((a, b) => b.lastLogin - a.lastLogin);

            switch (user.role) {
                case 'admin':
                    user.roleName = 'Administator';
                    break;
                case 'manager':
                    user.roleName = 'Manager';
                    break;
                case 'dev':
                    user.roleName = 'Developer';
                    break;
                case 'support':
                    user.roleName = 'Support';
                    break;
                case 'stuff':
                    user.roleName = 'Stuff';
                    break;
                default:
                    break;
            }

        // render profile view
        return res.render('dashboard/users/user', {
            title: user.name,
            loggedInUser: req.user,
            user,
            countries: Object.values(countries),
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
