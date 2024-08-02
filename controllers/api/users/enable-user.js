/**
 * @file /controllers/api/users/enable-user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { User } = require('../../../models');

// export enable user controller
module.exports = async (req, res, next) => {
    try {
        // get user id
        const { id } = req.params;

        // find user
        const user = await User.findById(id);

        // check if user exists
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        // set user status to active
        user.set({ status: 'active' });

        // save user
        await user.save();

        // return response
        return res.json({ message: 'Enabled user successfully' });
    } catch (error) {
        return next(error);
    }
};
