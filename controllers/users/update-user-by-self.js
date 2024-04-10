/**
 * @file /controllers/users/update-user-by-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const { matchedData } = require('express-validator');
const { User } = require('../../models');

// export update user by self controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        let validatedUser = matchedData(req);

        // filter out empty fields
        validatedUser = Object.keys(validatedUser).reduce((acc, key) => {
            if (validatedUser[key]) {
                acc[key] = validatedUser[key];
            }
            return acc;
        }, {});

        // get user id
        const { _id } = req.user;

        // get user
        const user = await User.findById(_id);

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // update user
        user.set({
            ...user.toObject(),
            ...validatedUser,
        });

        // save user
        await user.save();

        // success response
        return res.status(200).json({
            message: 'Updated user successfully',
            user,
        });
    } catch (error) {
        return next(error);
    }
};
