/**
 * @file controllers/dashboard/customers/view-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const { countries } = require('countries-list');
const { Customer } = require('../../../models');
const moment = require('moment');
const { currencyFormatter } = require('../../../utils/global');

// export customers view controller
module.exports = async (req, res) => {
    try {
        // get customers
        let customers = await Customer.find()
            .populate('wallet')
            .sort({ createdAt: -1 });

        // formate data and balance
        customers = customers.map((customer) => {
            const customerObj = { ...customer.toObject() };

            customerObj.createdAt = moment(customer.createdAt).format(
                'DD MMM YYYY, h:mm a'
            );
            customerObj.wallet.balance = currencyFormatter(
                customer.wallet.balance
            );

            return customerObj;
        });

        // return render view
        return res.render('dashboard/customers/index', {
            title: 'Customers',
            user: req.user,
            customers,
            countries: Object.values(countries),
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
