/**
 * @file /controllers/api/auth/customers/register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
const { welcome } = require('../../../../mails');
const { Customer, Token } = require('../../../../models');
const { generateToken, sendEmail } = require('../../../../utils');

// export register a new customer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { name, email, phone, password } = req.body;

        // get customer by email or phone
        const customer = await Customer.findOne({
            $or: [{ email }, { phone }],
        });

        // check if customer already exists
        if (customer) {
            return res.status(409).json({
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

        // delete existing expired tokens
        await Token.deleteMany({
            customer: newCustomer._id,
            type: 'verify-email',
            expiresAt: { $lt: new Date() },
        });

        // generate token
        const token = generateToken(newCustomer.toObject());

        // store token in db
        const tokenDoc = new Token({
            customer: newCustomer._id,
            token,
            type: 'verify-email',
        });

        // save token
        await tokenDoc.save();

        // save customer
        await newCustomer.save();

        // prepare email
        const info = welcome({ user: newCustomer.toObject(), token });

        // send mail
        await sendEmail(
            info.to,
            info.subject,
            info.text,
            info.html,
            info.attachments,
            (err, info) => (err ? console.log(err) : console.log(info))
        );

        // return response
        return res.status(201).json({
            message: 'Customer created successfully',
        });
    } catch (error) {
        return next(error);
    }
};
