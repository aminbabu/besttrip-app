/**
 * @file /controllers/auth/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const { matchedData } = require('express-validator');
const { welcome } = require('../../../mails');
const { Customer, Token } = require('../../../models');
const { generateToken, sendEmail } = require('../../../utils');

// export register a new customer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { name, email, phone, password } = matchedData(req);

        // check if customer already exists
        const customer = await Customer.findOne({ email });

        // check if customer already exists
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
            wallet: {
                balance: 0,
            },
        });

        // save customer
        await newCustomer.save();

        // get existing tokens
        const tokens = await Token.find({
            customer: newCustomer._id,
            type: 'verify-email',
        });

        // delete existing tokens
        await Promise.all(
            tokens.map((tokenItem) => tokenItem.type === 'verify-email' && tokenItem.deleteOne())
        );

        // generate token
        const token = generateToken(newCustomer.toObject());
        // store token in db
        const tokenDoc = new Token({
            customer: newCustomer._id,
            token,
            type: 'verify-email',
        });
        await tokenDoc.save();

        // send mail
        const info = welcome({ user: newCustomer.toObject(), token });
        await sendEmail(info.to, info.subject, info.text, info.html, info.attachments);

        // set token in response
        res.set('authorization', `Bearer ${token}`);

        // return response
        return res.status(201).json({
            message: 'Customer created successfully',
        });
    } catch (error) {
        return next(error);
    }
};
