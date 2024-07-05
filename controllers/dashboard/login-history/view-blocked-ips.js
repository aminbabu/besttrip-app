/**
 * @file controllers/dashboard/lgoin-history/view-blocked-ips.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { LoginHistory } = require('../../../models');

// export blocked ips view controller
module.exports = async (req, res) => {
    try {
        // get blocked ips
        const blockedIps = await LoginHistory.find({ status: 'blocked' }).sort({
            createdAt: -1,
        });

        // render blocked ips view
        return res.render('dashboard/login-history/blocked-ips', {
            title: 'Blocked IPs',
            blockedIps,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
