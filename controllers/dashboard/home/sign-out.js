/**
 * @file controllers/dashboard/auth/sign-out.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { verifyToken } = require('../../../utils');
const { LoginHistory } = require('../../../models');

// export sign-out controller
module.exports = async (req, res) => {
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

        // delete history
        if (history) {
            history.deleteOne();
        }

        // clear cookie and header
        res.clearCookie('token');
        res.removeHeader('Authorization');

        // redirect to sign-in page
        return res.redirect('/dashboard/auth/login');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
