/**
 * @file /controllers/api/customers/enable-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 Aug, 2024
 * @update_date 20 Aug, 2024
 */

// dependencies
const { Customer } = require('../../../models');

// export enable customer controller
module.exports = async (req, res, next) => {
    try {
        // get customer id
        const { id } = req.params;

        // find customer
        const customer = await Customer.findById(id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // set customer status to active
        customer.set({ status: 'active' });

        // save customer
        await customer.save();

        // return response
        return res
            .status(200)
            .json({ message: 'Enabled customer successfully' });
    } catch (error) {
        return next(error);
    }
};
