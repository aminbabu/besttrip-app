/**
 * @file /controllers/api/users/update-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 09 June, 2024
 */

const { User } = require('../../../models');
const { comparePassword } = require('../../../utils');

// export update password controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { password, currentPassword } = req.body;
        const { id } = req.params;

        // get user
        const user = await User.findById(id).select('+password');

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // convert user to object
        const userObject = user.toObject();

        // compare password
        const match = await comparePassword(currentPassword, userObject.password);

        // check if password match
        if (!match) {
            return res.status(400).json({
                message: 'Current password is incorrect',
            });
        }

        // set new password
        user.set({ password });

        // save user
        await user.save();

        // return response
        return res.status(200).json({
            message: 'Password updated successfully',
        });
    } catch (error) {
        return next(error);
    }
};
