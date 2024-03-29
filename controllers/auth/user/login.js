/**
 * @file /controllers/auth/login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const { User } = require('../../../models/index');
const { comparePassword, generateToken } = require('../../../utils');

// login user controller
const login = async (req, res, next) => {
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

        // return response
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export
module.exports = login;
