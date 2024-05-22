/**
 * @file /controllers/auth/users/reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 22 May, 2024
 */

// export reset-password view controller
module.exports = async (req, res, next) => {
    try {
        // render reset-password view
        return res.render('auth/users/reset-password');
    } catch (error) {
        return next(error);
    }
};
