/**
 * @file /controllers/api/users/update-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 21 June, 2024
 */

const { User } = require('../../../models');

// export update password controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { password } = req.body;
        const { id } = req.params;

        // get user
        const user = await User.findById(id).select('+password');

        // check if user exists
        if (!user) {
            return res.status(200).json({
                message: 'User not found',
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
