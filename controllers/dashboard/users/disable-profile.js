/**
 * @file /controllers/dashboard/users/disable-profile.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const { User } = require('../../../models');

// export profile disable controller
module.exports = async (req, res) => {
    try {
        // find user by id
        const user = await User.findById(req.user.id);

        // check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // update user profile status
        user.set({ status: 'disabled' });

        // save user
        await user.save();

        // return response
        return res.redirect('/dashboard/auth/logout');
    } catch (error) {
        // return error response
        return res.status(500).json({ message: error.message });
    }
};
