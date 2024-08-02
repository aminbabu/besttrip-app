/**
 * @file /controllers/api/auth/users/register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const { welcome } = require('../../../../mails');
const { User, Token } = require('../../../../models');
const { generateToken, sendEmail } = require('../../../../utils');

// export register a new user controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { name, email, phone, password } = req.body;

        // check if user already exists
        const user = await User.findOne({ role: 'admin' });

        // check if user already exists
        if (user) {
            return res.status(200).json({
                message:
                    'User with role admin already exists. Please contact support.',
            });
        }

        // create new user
        const newUser = new User({
            name,
            email,
            phone,
            password,
            role: 'admin',
        });

        // delete existing expired tokens
        await Token.deleteMany({
            user: newUser._id,
            type: 'verify-email',
            expiresAt: { $lt: new Date() },
        });

        // generate token
        const token = generateToken(newUser.toObject());

        // store token in db
        const tokenDoc = new Token({
            user: newUser._id,
            token,
            type: 'verify-email',
        });

        // prepare email
        const info = welcome({ user: newUser.toObject(), token });

        // send email
        await sendEmail(
            info.to,
            info.subject,
            info.text,
            info.html,
            info.attachments,
            (err, info) => (err ? console.log(err) : console.log(info))
        );

        // save token
        await tokenDoc.save();

        // save user
        await newUser.save();

        // return response
        return res.status(200).json({
            message: 'User created successfully',
        });
    } catch (error) {
        return next(error);
    }
};
