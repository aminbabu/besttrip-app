/**
 * @file /controllers/customers/update-customer-by-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const { Customer } = require('../../models');
const { generateToken } = require('../../utils');

// export update customer by self controller
module.exports = async (req, res, next) => {
    try {
        // get customer id
        const { id } = req.params;

        // get customer
        const customer = await Customer.findById(id);

        // update customer
        customer.set({ ...req.body });

        // save customer
        await customer.save();

        // generate token
        const token = generateToken(req.user);

        // success response
        return res.status(200).json({
            message: 'Updated successfully',
            customer,
            token,
        });
    } catch (error) {
        return next(error);
    }
};
