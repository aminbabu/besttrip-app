/**
 * @file /middlewares/auth/customers/is-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April 2024
 * @update_date 03 April 2024
 */

// dependencies
const { Customer } = require('../../../models');

// is self middleware
module.exports = async (req, res, next) => {
    try {
        // get customer id
        const { id } = req.params;

        // get customer
        const customer = await Customer.findById(id);

        // check if customer is self
        if (customer?._id.toString() !== req.user?._id.toString()) {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }

        // next middleware
        return next();
    } catch (error) {
        // error response
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
