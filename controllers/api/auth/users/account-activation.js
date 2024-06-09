/**
 * @file /controllers/api/auth/users/account-activation.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const { User } = require('../../../../models');
const { comparePassword } = require('../../../../utils');

// export account activation controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: 'Please check your email and password',
            });
        }

        // convert user to object
        const userObject = user.toObject();

        // compare password
        const match = await comparePassword(password, userObject.password);

        // check if password match
        if (!match) {
            return res.status(400).json({
                message: 'Please check your email and password',
            });
        }

        // check if user status is already active
        if (user.status === 'active') {
            return res.status(400).json({
                message: 'Your account is already active',
            });
        }

        // update user status
        user.set({ status: 'active' });

        // save user
        await user.save();

        // return response
        return res.status(200).json({
            message: 'Your account is activated',
        });
    } catch (error) {
        return next(error);
    }
};
