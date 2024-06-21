/**
 * @file controllers/dashboard/lgoin-history/view-lgoin-history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { LoginHistory } = require('../../../models');

// export login history view controller
module.exports = async (req, res) => {
    try {
        // get login history
        const loginHistory = await LoginHistory.find().sort({ createdAt: -1 });

        // render login history view
        return res.render('dashboard/login-history', {
            title: 'Login History',
            user: req.user,
            loginHistory,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
