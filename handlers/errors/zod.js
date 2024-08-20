/**
 * @file /handlers/api/errors/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 09 May, 2024
 */

// export zod error handler
module.exports = (res, zodErr) => {
    // parse errors from zod
    const errors = zodErr.errors.map((err) => ({
        field: err.path.join(', '),
        keys: err.keys?.join(', '),
        message: err.message,
    }));

    console.log(errors);

    // return error response
    return res.status(400).json({
        // message: 'Validation error',
        errors,
    });
};
