/**
 * @file controllers/dashboard/view-dashboard.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export dashboard view controller
module.exports = (req, res) => {
    try {
        // return dashboard page
        return res.render('dashboard/index', {
            title: 'Dashboard',
            user: req.user,
        });
    } catch (error) {
        return res.redirect('/errors/500');
    }
};
