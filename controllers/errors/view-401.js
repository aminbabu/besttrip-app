/**
 * @file controllers/errors/view-401.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export 401 error view controller
module.exports = (req, res) => {
    try {
        res.render('errors/401', {
            title: '401 - Unauthorized',
        });
    } catch (error) {
        console.error(error);
    }
};
