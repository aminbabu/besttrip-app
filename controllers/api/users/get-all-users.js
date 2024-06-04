/**
 * @file /controllers/api/users/get-all-users.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const { User } = require('../../../models');

// export get all users controller
module.exports = async (req, res, next) => {
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

        // return response
        return res.status(200).json({
            message: 'Fetched users successfully',
            users,
            totalCount,
        });
    } catch (error) {
        return next(error);
    }
};
