/**
 * @file controllers/dashboard/customers/view-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { Customer } = require('../../../models');

// export customers view controller
module.exports = async (req, res) => {
    try {
        // get customers
        const customers = await Customer.find();

        // return render view
        return res.render('dashboard/customers', {
            title: 'Customers',
            user: req.user,
            customers,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
