/**
 * @file /controllers/api/auth/users/account-activation.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const { accountActivation } = require('../../../../mails');
const { sendEmail, generateToken } = require('../../../../utils');
const { Token, User } = require('../../../../models');

// export send verification email controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { email } = req.body;

        // get user
        const user = await User.findOne({ email });

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // check if user is already active
        if (user.status === 'active') {
            return res.status(400).json({
                message: 'User is already active',
            });
        }

        // delete existing expired tokens
        await Token.deleteMany({
            user: user._id,
            type: 'account-activation',
            expiresAt: { $lt: new Date() },
        });

        // generate token
        const token = generateToken(user.toObject());

        // store token in db
        const tokenDoc = new Token({
            user: user._id,
            token,
            type: 'account-activation',
        });
        await tokenDoc.save();

        // send verification email
        const info = await accountActivation(user.toObject(), token);
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // return response
        return res.status(200).json({
            message: `Account activation email has been sent to ${user.email}`,
        });
    } catch (error) {
        return next(error);
    }
};
