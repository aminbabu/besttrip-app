/**
 * @file /controllers/auth/register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const welcome = require('../../../mails/welcome');
const { Customer } = require('../../../models');
const { generateToken, sendEmail } = require('../../../utils');

// register a new customer controller
const register = async (req, res, next) => {
    try {
        // get customer input
        const { name, email, phone, password } = req.body;

        // check if customer already exists
        const customer = await Customer.findOne({ email });

        if (customer) {
            return res.status(400).json({
                message: 'Customer already exists',
            });
        }

        // create new customer
        const newCustomer = new Customer({
            name,
            email,
            phone,
            password,
        });

        // generate token
        const token = generateToken(newCustomer.toObject());

        // send mail
        const info = welcome({ user: newCustomer.toObject(), token });
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // save customer
        await newCustomer.save();

        // return response
        return res.status(201).json({
            message: 'Customer created successfully',
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export
module.exports = register;
