/**
 * @file middlewares/files/upload-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { Customer, User } = require('../../models');

// export upload avatar middleware
module.exports =
    (dir = '/uploads') =>
    async (req, res, next) => {
        try {
            // check if file is not uploaded
            if (!req.files || !req.files.avatar) {
                return next();
            }

            // get id
            const { id } = req.params;

            // get avatar
            const { avatar } = req.files;

            // get user
            const user = id ? (await Customer.findById(id)) || (await User.findById(id)) : req.user;

            // check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // check if user has avatar
            if (user.avatar) {
                // delete previous avatar
                fs.unlinkSync(path.join(__dirname, '../../public/', user.avatar));
            }

            // prepare file path
            const filePath = path.join(
                'uploads/avatars/',
                `${dir}/${Date.now()}_${user._id}_${avatar.name}`
            );
            const uploadPath = path.join(__dirname, '../../public/', filePath);

            // move file to upload path
            await avatar.mv(uploadPath);

            // set file path to request body
            req.body.avatar = filePath;

            // continue to next middleware
            return next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
