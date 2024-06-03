/**
 * @file /controllers/auth/users/reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
 */

// export reset-password view controller
module.exports = async (req, res) => {
    try {
        // get token from query
        const { token } = req.query;

        // render reset-password view
        return res.render('auth/users/reset-password', {
            token,
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
