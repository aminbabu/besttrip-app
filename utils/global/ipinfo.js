/**
 * @file /utils/global/ipinfo.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 10 June, 2024
 */

// dependencies
const moment = require('moment');
const { History, User, Customer } = require('../../models');

// export ipinfo function
module.exports = async (req, user) => {
    let history;
    let existinUser;

    // ip information
    const { ip, city, region, country } = req.ipinfo;

    // get user
    if (user.role === 'customer') {
        existinUser = await Customer.findById(user?._id);
    } else {
        existinUser = await User.findById(user?._id);
    }

    // get last history
    history = await History.findOne({
        user: user?._id,
        ipAddress: ip,
        userAgent: req.headers['user-agent'],
    }).sort({
        createdAt: -1,
    });

    // check if login history is exist
    if (history) {
        // update last login
        history.set({ lastLogin: moment().toDate() });
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

    // update user login history
    existinUser.set({ history: history._id });

    // save history
    await history.save();

    // save user
    await existinUser.save();

    // return history
    return history;
};
