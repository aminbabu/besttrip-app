/**
 * @file controllers/dashboard/lgoin-history/view-blocked-ips.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { History } = require('../../../models');

// export blocked ips view controller
module.exports = async (req, res) => {
    try {
        // get blocked ips
        const blockedIps = await History.find({ status: 'blocked' }).sort({ createdAt: -1 });

        // render blocked ips view
        return res.render('dashboard/blocked-ips', {
            title: 'Blocked IPs',
            user: req.user,
            blockedIps,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
