/**
 * @file /controllers/dashboard/get-dashboard.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 May, 2024
 * @update_date 24 May, 2024
 */

// export get dashboard controller
module.exports = (req, res) => {
    try {
        return res.render('dashboard', {
            title: 'Dashboard',
            user: req.user,
        });
    } catch (error) {
        return res.render('errors/500', {
            title: `Error ${error.status}`,
            message: error.message,
        });
    }
};
