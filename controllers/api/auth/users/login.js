/**
 * @file /controllers/api/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const { User } = require('../../../../models');
const { comparePassword, generateToken } = require('../../../../utils');

// export login user controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // check if user status is active
        if (user.status !== 'active') {
            return res.status(400).json({
                message: 'User is not active',
            });
        }

        // convert user to object
        const userObject = user.toObject();

        // compare password
        const match = await comparePassword(password, userObject.password);

        if (!match) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // remove password from user object
        delete userObject.password;

        // generate token
        const token = generateToken(userObject);

        // set token in response
        res.set('authorization', `Bearer ${token}`);

        // return response
        return res.status(200).json({
            message: 'Login successful',
        });
    } catch (error) {
        return next(error);
    }
};
