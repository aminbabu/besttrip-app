/**
 * @file /controllers/auth/users/register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 26 May, 2024
 */

// export register view controller
module.exports = async (req, res, next) => {
    try {
        // render register view
        // return res.render('auth/users/register');
        return res.redirect('/');
    } catch (error) {
        return next(error);
    }
};
