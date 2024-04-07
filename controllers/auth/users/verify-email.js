/**
 * @file /controllers/auth/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

// dependencies
const { confirmEmailVerification } = require('../../../mails');
const { User } = require('../../../models');
const { verifyToken, sendEmail, generateToken } = require('../../../utils');

// export verify email controller
module.exports = async (req, res, next) => {
    try {
        // get token from query
        const { token } = req.query;

        // verify token
        const payload = verifyToken(token);

        // check if token is valid
        const user = await User.findById(payload.user._id);

        // check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // check if user is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // update user
        user.isVerified = true;
        await user.save();

        // generate token
        const newToken = generateToken(user);

        // send email
        const info = await confirmEmailVerification(user);
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // set token in response
        res.set('authorization', `Bearer ${newToken}`);

        // send response
        return res.status(200).json({
            message: 'Email verified',
        });
    } catch (err) {
        return next(err);
    }
};
