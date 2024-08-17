/**
 * @file controllers/dashboard/auth/view-two-step.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies

// export verify-email view controller
module.exports = async (req, res) => {
    try {
        return res.render('dashboard/auth/two-factor', {
            title: 'Two Step Verification',
            email: req.user.email,
        });
    } catch (err) {
        return res.redirect('/dashboard/errors/500');
    }
};
