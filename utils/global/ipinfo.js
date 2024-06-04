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
const { History, User } = require('../../models');

// export ipinfo function
module.exports = async (req, user) => {
    let history;

    // ip information
    const { ip, city, region, country } = req.ipinfo;

    // get user
    const existinUser = User.findById(user?._id);

    // get last history
    history = await History.findOne({ user: user?._id, ipAddress: ip }).sort({
        createdAt: -1,
    });

    // check if last history is exist
    if (history) {
        // update last login
        history.lastLogin = moment().toDate();
    } else {
        // create new history
        history = new History({
            user: user._id,
            lastLogin: moment().toDate(),
            userAgent: req.headers['user-agent'],
            ipAddress: ip,
            location: {
                city,
                region,
                country,
            },
        });
    }

    // update user last login
    if (existinUser) {
        existinUser.set({ history: history._id });
    }

    // save history
    await history.save();

    // save user
    await existinUser.save();

    // return history
    return history;
};
