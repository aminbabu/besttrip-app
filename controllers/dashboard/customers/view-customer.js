/**
 * @file controllers/dashboard/customers/view-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const moment = require('moment');
const { Customer } = require('../../../models');
const { countries } = require('countries-list');

// export customer view controller
module.exports = async (req, res) => {
    try {
        // get customer id from request params
        const { id } = req.params;

        // get customer by id with wallet, bookings, and payment-requests in descending order
        const existingcustomer = await Customer.findById(id)
            .populate({
                path: 'wallet',
            })
            .populate({
                path: 'umrahBookings',
                options: { sort: { createdAt: -1 } },
            })
            .populate({
                path: 'paymentRequests',
                options: { sort: { createdAt: -1 } },
            });

        // check if customer exists
        if (!existingcustomer) {
            return res.redirect('/dashboard/error/404');
        }

        const customer = existingcustomer.toObject();

        // format customer dates
        customer.createdAt = moment(customer.createdAt).format(
            'DD MMM YYYY, h:mm a'
        );
        customer.updatedAt = moment(customer.updatedAt).format(
            'DD MMM YYYY, h:mm a'
        );

        // return rendered view
        return res.render('dashboard/customers/customer', {
            title: customer.name,
            customer,
            countries: Object.values(countries),
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
