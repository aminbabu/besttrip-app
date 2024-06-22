/**
 * @file controllers/errors/view-401.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { LoginHistory } = require('../../../models');
const { verifyToken } = require('../../../utils');

// export 401 error view controller
module.exports = (req, res) => {
    try {
        // get token from cookie or header
        const token = req.cookies.token || req.headers.authorization;

        // ip information
        const { ip } = req.ipinfo;

        // verify token
        const { user } = verifyToken(token) || {};

        // get last history
        const history = await LoginHistory.findOne({
            user: user?._id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }).sort({
            createdAt: -1,
        });

        // check if history found
        if (history) {
            history.deleteOne();
        }

        // clear cookie and header
        res.clearCookie('token');
        res.removeHeader('Authorization');

        // render redirect to login page
        res.redirect('/auth/users/login');
    } catch (error) {
        console.error(error);
    }
};
