/**
 * @file /controllers/users/get-users.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const { User } = require('../../models');

// export get all users controller
module.exports = async (req, res) => {
    try {
        // get all users and total count using aggregation
        const [{ users, totalCount }] = await User.aggregate([
            {
                $group: {
                    _id: null,
                    users: { $push: '$$ROOT' },
                    totalCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    users: 1,
                    totalCount: 1,
                },
            },
        ]);

        // return rendered users
        return res.render('users', { users, totalUser: totalCount });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
