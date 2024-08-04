/**
 * @file /controllers/api/users/update-role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 June, 2024
 * @update_date 21 June, 2024
 */

const { User } = require('../../../models');

// export update role controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { role } = req.body;
        const { id } = req.params;

        // get user
        const user = await User.findById(id);

        // check if user exists
        if (!user) {
            return res.status(200).json({
                message: 'User not found',
            });
        }

        // set user role
        user.set({ role });

        // save user
        await user.save();

        // return response
        return res.status(200).json({
            message: 'User role updated successfully',
        });
    } catch (error) {
        return next(error);
    }
};
