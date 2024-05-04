/**
 * @file /middlewares/validation/umrah/extranets/validate-umrah-extranet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 04 May, 2024
 */

// dependencies
const { umrahExtranetSchema } = require('../../../../schemas/zod/umrah/extranets');
const { zodErrorHandler } = require('../../../../handlers/errors');

// export umrah extranet validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = umrahExtranetSchema.omit({ id: true }).safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
