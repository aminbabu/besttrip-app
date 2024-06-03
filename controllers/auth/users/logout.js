/**
 * @file /controllers/auth/users/logout.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 May, 2024
 * @update_date 03 June, 2024
 */

// export logout controller
module.exports = (req, res) => {
    try {
        // remove token from cookies and headers
        res.clearCookie('token');
        res.removeHeader('authorization');

        // return redirect to login
        return res.redirect('/dashboard/login');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
