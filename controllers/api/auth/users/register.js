/**
 * @file /controllers/api/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
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
        const user = await User.findOne({ email });

        // check if user already exists
        if (user) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        // create new user
        const newUser = new User({
            name,
            email,
            phone,
            password,
        });

        // save user
        await newUser.save();

        // get existing tokens
        const tokens = await Token.find({
            user: newUser._id,
            type: 'verify-email',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map((tokenItem) => tokenItem.type === 'verify-email' && tokenItem.deleteOne())
        );

        // generate token
        const token = generateToken(newUser.toObject());
        // store token in db
        const tokenDoc = new Token({
            user: newUser._id,
            token,
            type: 'verify-email',
        });
        await tokenDoc.save();

        // send mail
        const info = welcome({ user: newUser.toObject(), token });
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // set token in response
        res.set('authorization', `Bearer ${token}`);

        // return response
        return res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        return next(error);
    }
};
