/**
 * @file /controllers/dashboard/users/view-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 20 June, 2024
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

        // get user with histories
        const existingUser = await User.findById(id).populate('histories');

        // convert user and login histories to object
        const user = existingUser.toObject();

        // format user dates
        user.createdAt = moment(user.createdAt).format('DD MMM YYYY, h:mm a');
        user.updatedAt = moment(user.updatedAt).format('DD MMM YYYY, h:mm a');
        user.histories = user.histories.map((history) => {
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
        });

        // render profile view
        return res.render('dashboard/users/user', {
            title: req.user.name,
            user,
            countries: Object.values(countries),
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
