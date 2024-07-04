/**
 * @file middlewares/utils/not-found.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 Jul, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
const createError = require('http-errors');

// export not found middleware
module.exports = (req, res, next) => {
    next(createError(404));
};
