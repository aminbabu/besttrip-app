/**
 * @file middlewares/files/upload-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 12 April, 2024
 */

// dependencies
const path = require('path');

// export upload avatar middleware
module.exports =
    (dir = '/uploads') =>
    async (req, res, next) => {
        try {
            // get avatar
            const { avatar } = req.files;

            // prepare file path
            const filePath = path.join('uploads/', `${dir}/${avatar.name}`);
            const uploadPath = path.join(__dirname, '../../public/', filePath);

            // move file to upload path
            await avatar.mv(uploadPath);

            // set file path to request body
            req.body.avatar = filePath;

            // call next middleware
            return next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
