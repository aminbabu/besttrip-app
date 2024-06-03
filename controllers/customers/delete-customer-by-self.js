/**
 * @file /controllers/api/customers/delete-customer-by-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 11 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { Customer } = require('../../models');

// export delete customer by self controller
module.exports = async (req, res, next) => {
    try {
        // get customer id
        const { _id } = req.user;

        // delete customer
        const customer = await Customer.findById(_id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // delete customer
        await customer.deleteOne();

        // delete customer avatar
        if (customer.avatar) {
            fs.unlinkSync(
                path.join(__dirname, `../../../public/uploads/avatars/customers/${customer.avatar}`)
            );
        }

        // remove token from headers
        res.removeHeader('Authorization');

        // return response
        return res.status(200).json({
            message: 'Deleted customer successfully',
            customer,
        });
    } catch (error) {
        return next(error);
    }
};
