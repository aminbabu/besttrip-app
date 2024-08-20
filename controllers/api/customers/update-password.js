/**
 * @file /controllers/api/customers/update-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 Aug, 2024
 * @update_date 20 Aug, 2024
 */

const { Customer } = require('../../../models');

// export update password controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { password } = req.body;
        const { id } = req.params;

        // get customer
        const customer = await Customer.findById(id).select('+password');

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // set new password
        customer.set({ password });

        // save customer
        await customer.save();

        // return response
        return res.status(200).json({
            message: 'Password updated successfully',
        });
    } catch (error) {
        return next(error);
    }
};
