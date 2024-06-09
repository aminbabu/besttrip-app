/**
 * @file /controllers/api/customers/delete-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { Customer } = require('../../../models');

// export delete customer by mongo id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get customer
        const customer = await Customer.findById(id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // delete customer avatar
        if (customer.avatar) {
            fs.unlinkSync(path.join(__dirname, `../../../public/${customer.avatar}`));
        }

        // delete customer
        await customer.deleteOne();

        // return response
        return res.status(200).json({
            message: 'Deleted customer successfully',
            customer,
        });
    } catch (error) {
        return next(error);
    }
};
