/**
 * @file /controllers/api/customers/get-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { Customer } = require('../../../models');

// export get customer by mongo id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        console.log(id,req?.user?._id);

        // get customer

        // const req.user.role;
        // const req.user._id;
        // check if customer exists
        if (req.user.role === 'customer') {
            if (id.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: 'You are not allowed to access this resource',
                });
            } else {
                const customer = await Customer.findById(id).populate("wallet");
                return res.status(200).json({
                    message: 'Fetched customer successfully',
                    customer,
                });
            }
        }
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched customer successfully',
            customer,
        });
    } catch (error) {
        return next(error);
    }
};
