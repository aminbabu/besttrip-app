/**
 * @file controllers/errors/view-404.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export 404 error view controller
module.exports = (req, res) => {
    try {
        res.render('errors/404', {
            title: '404 - Page Not Found',
        });
    } catch (error) {
        console.error(error);
    }
};
