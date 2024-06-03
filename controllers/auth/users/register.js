/**
 * @file /controllers/auth/users/register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
 */

// export register view controller
module.exports = async (req, res) => {
    try {
        // render register view
        // return res.render('auth/register');
        return res.redirect('/');
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
