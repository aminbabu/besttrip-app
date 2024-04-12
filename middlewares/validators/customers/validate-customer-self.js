/**
 * @file /middlewares/validators/customers/update-customer-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');
const { CUSTOMER_STATUS } = require('../../../constants');
const { Customer } = require('../../../models');

// update customer validator

// update customer validator
module.exports = [
    body('customerID').not().exists().withMessage('You are not allowed to update the customer ID'),
    body('name').isLength({ min: 3 }).withMessage('Name should be at least 3 characters'),
    body('email').isEmail().withMessage('Email should be a valid email'),
    body('phone').isMobilePhone().withMessage('Phone should be a valid phone number'),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters'),
    body('dob')
        .optional()
        .toDate()
        .isDate()
        .withMessage('Date of birth should be a valid javascript date'),
    body('status')
        .optional()
        .isIn(CUSTOMER_STATUS)
        .withMessage(`Status should be one of ${CUSTOMER_STATUS.join(', ')}`),
    body('address')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('Address should be between 3 and 100 characters'),
    body('city')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('City should be between 3 and 50 characters'),
    body('state')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('State should be between 3 and 50 characters'),
    body('country')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('Country should be between 3 and 50 characters'),
    body('postalCode')
        .optional()
        .isPostalCode()
        .withMessage('Postal code should be a valid postal code'),
    body('flyerNumber').optional().isNumeric().withMessage('Flyer number should be a number'),
    body('wallet').not().exists().withMessage('You are not allowed to update the wallet'),
    body('role').not().exists().withMessage('You are not allowed to update the role'),
    body('isVerified')
        .not()
        .exists()
        .withMessage('You are not allowed to update the verification status'),
    expressValidator,
    async (req, res, next) => {
        // get email from the request body
        const { email } = req.body;

        // get customer by email
        const customer = await Customer.findOne({ email });

        // check if customer exists
        if (customer) {
            return res.status(400).json({ message: `Customer with email ${email} already exists` });
        }

        // continue to the next middleware
        return next();
    },
];
