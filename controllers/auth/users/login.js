/**
 * @file /controllers/auth/login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 0
 */

// dependencies
const { User } = require('../../../models');
const { comparePassword, generateToken } = require('../../../utils');

// export login user controller
module.exports = async (req, res, next) => {
    try {
        // get user input
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // compare password
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        // generate token
        const token = generateToken(user.toObject());

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
