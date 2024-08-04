/**
 * @file /controllers/api/auth/users/login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
const { env } = require('../../../../config');
const { User } = require('../../../../models');
const { comparePassword, generateToken, ipInfo } = require('../../../../utils');

// export login user controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email })
            .select('+password')
            .populate('loginHistory');

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

        // check if user status is active
        if (user.status !== 'active') {
            return res.status(200).json({
                message: 'User is not active. Please contact support',
            });
        }

        // check if user is verified
        if (!user.isVerified) {
            return res.status(200).json({
                message: 'Please verify your email',
            });
        }

        // update and get user history
        const history = await ipInfo(req, userObject);

        // check if history status is blocked
        if (history.status === 'blocked') {
            return res.status(200).json({
                message: 'This account is blocked. Please contact support',
            });
        }

        // remove password, history from user object
        delete userObject.password;
        delete userObject.loginHistory;

        // generate token
        const token = generateToken(userObject);

        // save user
        await user.save();

        // set token in response
        res.set('authorization', `Bearer ${token}`);

        // set cookie in response
        res.cookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: env.JWT_EXPIRY,
        });

        // return response
        return res.status(200).json({
            message: 'Login successful',
        });
    } catch (error) {
        return next(error);
    }
};
