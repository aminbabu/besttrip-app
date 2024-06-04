/**
 * @file /middlewares/api/validators/global/validate-existed-customer-account.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { Customer } = require('../../../../models');

// export customer account validator middleware
module.exports = async (req, res, next) => {
    // check if customer is updating self
    if (req.user.email === req.body.email || req.user.phone === req.body.phone) {
        return next();
    }

    // get email, phone and id
    const { email, phone } = req.body;
    const { id } = req.params;

    // get customer by email or phone
    const customer = await Customer.findOne({
        $or: [{ email }, { phone }],
        _id: { $ne: id },
    });

    // check if customer exists
    if (customer) {
        return res.status(400).json({ message: 'Email or phone already exists' });
    }

    // continue to the next middleware
    return next();
};
