/**
 * @file controllers/dashboard/auth/sign-out.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export sign-out controller
module.exports = (req, res) => {
    try {
        // clear cookie and header
        res.clearCookie('token');
        res.removeHeader('Authorization');

        // redirect to sign-in page
        return res.redirect('/dashboard/login');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
