/**
 * @file /controllers/api/auth/users/two-step-auth.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 June, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const { User } = require('../../../../models');
const { comparePassword } = require('../../../../utils');

// export two step auth controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(200).json({
                message: 'Please check your email and password',
            });
        }

        // convert user to object
        const userObject = user.toObject();

        // compare password
        const match = await comparePassword(password, userObject.password);

        // check if password match
        if (!match) {
            return res.status(200).json({
                message: 'Please check your email and password',
            });
        }

        // update user two step auth
        user.set({ twoStepAuth: !user.twoStepAuth });

        // save user
        await user.save();

        // return response
        return res.status(200).json({
            message: `Your 2FA has been ${
                user.twoStepAuth ? 'enabled' : 'disabled'
            } successfully.`,
            user,
        });
    } catch (error) {
        return next(error);
    }
};
