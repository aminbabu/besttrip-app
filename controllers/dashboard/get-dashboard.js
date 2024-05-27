/**
 * @file /controllers/dashboard/get-dashboard.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 May, 2024
 * @update_date 27 May, 2024
 */

// export get dashboard controller
module.exports = (req, res) => {
    try {
        return res.render('index', {
            user: req.user,
        });
    } catch (error) {
        return res.render('errors/500', {
            message: error.message,
        });
    }
};
