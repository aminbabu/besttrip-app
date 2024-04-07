/**
 * @file /controllers/auth/register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const { welcome } = require('../../../mails');
const { User } = require('../../../models');
const { generateToken, sendEmail } = require('../../../utils');

// export register a new user controller
module.exports = async (req, res, next) => {
    console.log(req.body);
    try {
        // get user input
        const { name, email, phone, password } = req.body;

        // check if user already exists
        const user = await User.findOne({ email });

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

        // generate token
        const token = generateToken(newUser.toObject());

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
