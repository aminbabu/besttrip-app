/**
 * @file /controllers/api/users/update-user-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { User } = require('../../../models');

// export update user by mongo id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedUser = req.body;
        const { avatar } = req.files;

        // get user
        const user = await User.findById(id);

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // update user
        user.set({
            ...validatedUser,
            avatar: avatar?.path || user.avatar,
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
