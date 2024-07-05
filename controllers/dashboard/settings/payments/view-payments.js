/**
 * @file controllers/dashboard/settings/payments/view-payments.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { PaymentSettings } = require('../../../../models');

// export payments view controller
module.exports = async (req, res) => {
    try {
        // get payments
        const payments = await PaymentSettings.find();

        // render payments view
        return res.render('dashboard/settings/payments', {
            title: 'Payment Methods',
            payments,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
