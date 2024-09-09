/**
 * @file controllers/dashboard/auth/view-account-activation.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 09 June, 2024
 */

// export account activation view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/account-activation', {
            title: 'Account Activation',
            message:
                'Please enter your email to send account activation link. If you have not received the email, please check your spam folder.',
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
