/**
 * @file controllers/dashboard/home/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 04 June, 2024
 */

// export dashboard view controller
module.exports = (req, res) => {
    try {
        // return dashboard page
        return res.render('dashboard/home', {
            title: 'Dashboard',
        });
    } catch (error) {
        return res.redirect('/dashboard/errors/500');
    }
};
