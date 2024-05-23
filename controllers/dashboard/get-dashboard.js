/**
 * @file /controllers/dashboard/get-dashboard.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 May, 2024
 * @update_date 24 May, 2024
 */

// export get dashboard controller
module.exports = (req, res, next) => {
    try {
        return res.status(200).json({
            message: 'Dashboard data',
            data: {
                user: req.user,
            },
        });
    } catch (error) {
        return next(error);
    }
};
