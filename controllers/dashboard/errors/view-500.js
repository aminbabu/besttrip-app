/**
 * @file controllers/errors/view-500.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export 500 error view controller
module.exports = (req, res) => {
    try {
        res.render('errors/500', {
            title: '500 - Internal Server Error',
        });
    } catch (error) {
        console.error(error);
    }
};
