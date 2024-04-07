/**
 * @file /controllers/users/get-all-users.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const { User } = require('../../models');

// export get all users controller
module.exports = async (req, res, next) => {
    try {
        // get all users
        const users = await User.find();

        // return response
        return res.status(200).json({
            message: 'Fetched all users successfully',
            users,
        });
    } catch (error) {
        return next(error);
    }
};
