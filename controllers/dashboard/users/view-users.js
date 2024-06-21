/**
 * @file controllers/dashboard/users/view-users.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const moment = require('moment');
const { User } = require('../../../models');
const { prepareRoleDefination } = require('../../../utils');

// export users view controller
module.exports = async (req, res) => {
    try {
        // get users
        let users = await User.find().sort({ createdAt: -1 });

        // formate data
        users = users.map((user) => {
            const userObj = {...user.toObject()};

            userObj.createdAt = moment(user.createdAt).format('DD MMM YYYY, h:mm a');

            return prepareRoleDefination(userObj);
        });

        // return render view
        return res.render('dashboard/users', {
            title: 'Users',
            user: req.user,
            users,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
