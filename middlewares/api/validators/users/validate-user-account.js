/**
 * @file /middlewares/api/validators/global/validate-existed-user-account.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 09 June, 2024
 */

// export user account validator middleware
module.exports = async (req, res, next) => {
    // check if user is updating self
    if (req.user.email !== req.body.email || req.user.phone !== req.body.phone) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    // continue to the next middleware
    return next();
};
