/**
 * @file /middlewares/validators/customers/validate-existed-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { Customer } = require('../../../models');

// export validate existed email middleware
module.exports = async (req, res, next) => {
    // check if customer is updating self
    if (req.user.email === req.body.email) {
        return next();
    }

    // get customer by email
    const customer = await Customer.findOne({ email: req.body.email });

    // check if customer exists
    if (customer) {
        return res
            .status(400)
            .json({ message: `Customer with email ${req.body.email} already exists` });
    }

    // continue to the next middleware
    return next();
};
