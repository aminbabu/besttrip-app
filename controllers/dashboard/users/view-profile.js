/**
 * @file /controllers/dashboard/users/view-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// dependencies
const moment = require('moment');
const { User } = require('../../../models');

// export profile view controller
module.exports = async (req, res) => {
    try {
        // get user and format dates
        const existingUser = await User.findById(req.user._id).populate('history');

        // convert user to object
        const user = existingUser.toObject();

        // format dates
        user.createdAt = moment(user.createdAt).format('DD MMM YYYY, h:mm a');
        user.updatedAt = moment(user.updatedAt).format('DD MMM YYYY, h:mm a');

        if (user?.history?.lastLogin) {
            user.history.lastLogin = moment(user.lastLogin).format('DD MMM YYYY, h:mm a');
        }

        // render profile view
        return res.render('dashboard/users/profile', {
            title: req.user.name,
            user,
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
