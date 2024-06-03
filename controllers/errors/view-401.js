/**
 * @file controllers/errors/view-401.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export 401 error view controller
module.exports = (req, res) => {
    try {
        // clear cookie and header
        res.clearCookie('token');
        res.removeHeader('Authorization');

        // render redirect to login page
        return res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
