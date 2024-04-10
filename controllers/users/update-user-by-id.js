/**
 * @file /controllers/users/update-user-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const { matchedData } = require('express-validator');
const { User } = require('../../models');

// export update user by mongo id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedUser = matchedData(req);

        // get user
        const user = await User.findById(validatedUser.id);

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // update user
        user.set({
            ...user.toObject(),
            ...validatedUser,
        });

        // save user
        await user.save();

        // return response
        return res.status(200).json({
            message: 'Updated user successfully',
            user,
        });
    } catch (error) {
        return next(error);
    }
};
