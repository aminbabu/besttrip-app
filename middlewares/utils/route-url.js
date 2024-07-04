/**
 * @file middlewares/utils/route-url.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 Jul, 2024
 * @update_date 04 Jul, 2024
 */

// export route url middleware
module.exports = (req, res, next) => {
    // set url in locals
    res.locals.url = req.originalUrl;

    // return next middleware
    next();
};
