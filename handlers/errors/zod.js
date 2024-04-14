/**
 * @file /handlers/errors/zod.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// export zod error handler
module.exports = (res, error) => {
    // parse errors from zod
    const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
    }));

    // return error response
    return res.status(400).json({
        errors,
    });
};
