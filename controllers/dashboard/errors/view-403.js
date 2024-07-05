/**
 * @file controllers/dashboard/errors/view-403.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 05 Jul, 2024
 */

// export 403 error view controller
module.exports = (req, res) => {
    try {
        res.render('dashboard/errors/403', {
            title: '403 - Forbidden',
        });
    } catch (error) {
        console.error(error);
    }
};
