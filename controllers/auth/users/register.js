/**
 * @file /controllers/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 22 May, 2024
 */

// export register view controller
module.exports = async (req, res, next) => {
    try {
        // render register view
        return res.render('auth/users/register');
    } catch (error) {
        return next(error);
    }
};
