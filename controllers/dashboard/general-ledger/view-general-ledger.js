/**
 * @file controllers/dashboard/general-ledger/view-general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { GeneralLedger } = require('../../../models');

// export general ledger view controller
module.exports = async (req, res) => {
    try {
        // get general ledger
        const generalLedger = await GeneralLedger.find();

        // return render view
        return res.render('dashboard/general-ledger', {
            title: 'General Ledger',
            generalLedger,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
