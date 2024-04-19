/**
 * @file /middlewares/validators/users/update-user-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { userSchema } = require('../../../schemas/zod/users');
const { zodErrorHandler } = require('../../../handlers/errors');

// export validate user self middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = userSchema
        .omit({
            id: true,
            role: true,
            isVerified: true,
        })
        .safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
