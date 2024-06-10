/**
 * @file /controllers/dashboard/users/view-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 10 June, 2024
 */

// dependencies
const moment = require('moment');
const { countries } = require('countries-list');
const { User, History } = require('../../../models');

// export profile view controller
module.exports = async (req, res) => {
    try {
        // get user with history
        const existingUser = await User.findById(req.user._id).populate({
            path: 'history',
            select: 'lastLogin',
        });
        const histories = await History.find({ user: req.user._id }).sort({ createdAt: -1 });

        // convert user and login history to object
        const user = existingUser.toObject();

        // format user dates
        user.createdAt = moment(user.createdAt).format('DD MMM YYYY, h:mm a');
        user.updatedAt = moment(user.updatedAt).format('DD MMM YYYY, h:mm a');
        user.history.lastLogin = moment(user.history.lastLogin).format('DD MMM YYYY, h:mm a');

        // format login histories
        const loginHistories = histories.map((history) => {
            const lastLoginDaysAgo = moment(history.lastLogin).fromNow();
            const lastLogin = moment(history.lastLogin).format('DD MMM YYYY, h:mm a');
            const location = Object.values(history.location)
                .filter((loc) => loc)
                .join(', ');

            return {
                ...history.toObject(),
                location: location || 'Unknown',
                lastLogin,
                lastLoginDaysAgo,
            };
        });

        // render profile view
        return res.render('dashboard/users/profile', {
            title: req.user.name,
            user,
            countries: Object.values(countries),
            loginHistories,
        });
    } catch (error) {
        console.log('Error in viewProfile', error);
        return res.redirect('/errors/500');
    }
};
