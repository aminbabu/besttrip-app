/**
 * @file controllers/dashboard/customers/view-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { Customer } = require('../../../models');

// export customer view controller
module.exports = async (req, res) => {
    try {
        // get customer id from request params
        const { id } = req.params;

        // get customer
        const customer = await Customer.findById(id);

        // check if customer exists
        if (!customer) {
            return res.redirect('/error/404');
        }

        // return rendered view
        return res.render('dashboard/customers/customer', {
            title: 'Edit Customer',
            user: req.user,
            customer,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
