/**
 * @file controllers/dashboard/auth/view-email-verification.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export verify-email view controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard/auth/email-verification', {
            title: 'Email Verification',
            message:
                'Your email has been verified successfully! You can now login to your account.',
        });
    } catch (err) {
        return res.redirect('/errors/500');
    }
};
