/**
 * @file /controllers/api/users/disable-user-by-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { User } = require('../../../models');

// export disable user by self controller
module.exports = async (req, res, next) => {
    try {
        // get user id
        const { _id } = req.user;

        // find user
        const user = await User.findById(_id);

        // check if user exists
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        // set user status to disabled
        user.set({ status: 'disabled' });

        // save user
        await user.save();

        // remove token from cookie and header
        res.clearCookie('token');
        res.removeHeader('authorization');

        // return response
        return res.json({ message: 'Disabled user successfully' });
    } catch (error) {
        return next(error);
    }
};
