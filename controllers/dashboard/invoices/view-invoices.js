/**
 * @file controllers/dashboard/invoices/view-invoices.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { Invoice } = require('../../../models');

// export invoice view controller
module.exports = async (req, res) => {
    try {
        // get invoice
        const invoices = await Invoice.find();

        // return render view
        return res.render('dashboard/invoices', {
            title: 'Invoices',
            invoices,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
