/**
 * @file controllers/errors/view-401.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 21 June, 2024
 */

// export 401 error view controller
module.exports = (req, res) => {
    try {
        // clear cookie and header
        res.clearCookie('token');
        res.removeHeader('Authorization');

        // render redirect to login page
        res.redirect('/auth/users/login');
    } catch (error) {
        console.error(error);
    }
};
