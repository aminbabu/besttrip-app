/**
 * @file /controllers/auth/users/resend-verification-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export resend verification email controller
module.exports = async (req, res, next) => {
    try {
        // return resend verification email view
        return res.render('auth/resend-verification-email');
    } catch (error) {
        return next(error);
    }
};
