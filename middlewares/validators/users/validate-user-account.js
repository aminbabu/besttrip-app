/**
 * @file /middlewares/validators/global/validate-existed-user-account.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { User } = require('../../../models');

// export user account validator middleware
module.exports = async (req, res, next) => {
    // check if user is updating self
    if (req.user.email === req.body.email || req.user.phone === req.body.phone) {
        return next();
    }

    // get email, phone and id
    const { email, phone } = req.body;
    const { id } = req.params;

    // get user by email or phone
    const user = await User.findOne({
        $or: [{ email }, { phone }],
        _id: { $ne: id },
    });

    // check if user exists
    if (user) {
        return res.status(400).json({ message: 'Email or phone already exists' });
    }

    // continue to the next middleware
    return next();
};
