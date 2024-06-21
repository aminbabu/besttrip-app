/**
 * @file /controllers/api/users/delete-user-login-history-by-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { User, LoginHistory } = require('../../../models');

// export delete user login history by self controller
module.exports = async (req, res, next) => {
    try {
        // get user id
        const {
            user: { _id: userId },
        } = req;

        // get user
        const user = await User.findById(userId);

        // get user login history
        const loginHistory = await LoginHistory.find({ user: userId });

        // update user
        user.set({ loginHistory: [] });

        // delete user login history
        await loginHistory.deleteMany();

        // save user
        await user.save();

        // clear token from cookies and headers
        res.clearCookie('token');
        res.removeHeader('Authorization');

        // return response
        return res.status(200).json({
            message: 'Deleted your login history successfully. You are logged out now.',
        });
    } catch (error) {
        return next(error);
    }
};
