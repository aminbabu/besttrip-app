/**
 * @file /utils/global/ipinfo.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// dependencies
const moment = require('moment');
const { History } = require('../../models');

// export ipinfo function
module.exports = async (req) => {
    // ip information
    const { ip, city, region, country } = req.ipinfo || {};

    // create new history
    const history = new History({
        user: req.user._id,
        lastLogin: moment().toDate(),
        userAgent: req.headers['user-agent'],
        ipAddress: ip,
        location: {
            city,
            region,
            country,
        },
    });

    // save history
    await history.save();

    // return history
    return history;
};
