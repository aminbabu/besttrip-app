/**
 * @file /middlewares/api/validators/validateSendVerificationEmail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 27 May, 2024
 */

const { sendVerificationEmailSchema } = require('../../../../schemas/zod/auth');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export validate send verification email middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = sendVerificationEmailSchema.safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
