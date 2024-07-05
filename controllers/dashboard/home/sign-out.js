/**
 * @file controllers/dashboard/auth/sign-out.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 05 Jul, 2024
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
        const history = await LoginHistory.find({
            user: user?._id,
            ipAddress: ip,
        }).sort({
            createdAt: -1,
        });

        // delete history
        if (history.length) {
            history?.forEach(async (item) => {
                await item.deleteOne();
            });
        }

        // clear cookie and header
        res.clearCookie('token');
        res.removeHeader('Authorization');

        // redirect to sign-in page
        return res.redirect('/dashboard/auth/login');
    } catch (error) {
        return res.redirect('/dashboard/errors/500');
    }
};
