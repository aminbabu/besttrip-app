/**
 * @file middlewares/files/upload-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 12 April, 2024
 */

// export upload avatar middleware
module.exports =
    (dir = '/uploads') =>
    (req, res, next) => {
        console.log('dir', dir);
        console.log(req.files);

        // continue to next middleware
        return next();
    };
