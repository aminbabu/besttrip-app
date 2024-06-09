/**
 * @file middlewares/files/upload-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Customer, User } = require('../../../models');

// export upload avatar middleware
module.exports =
    (dir = '/avatars') =>
    async (req, res, next) => {
        try {
            // get id
            const { id } = req.params || {};

            // get avatar
            const { avatar } = req.files || {};

            console.log(avatar);

            // get user
            const user = id ? (await Customer.findById(id)) || (await User.findById(id)) : req.user;

            // check if user has avatar
            if (user.avatar) {
                // delete previous avatar
                fs.unlinkSync(path.join(__dirname, '../../../public/', user.avatar));
            }

            // continue if no avatar uploaded
            if (!avatar) {
                return next();
            }

            // prepare file path
            const filePath = path.join('uploads/', `${dir}/${uuidv4()}_${user._id}_${avatar.name}`);
            const uploadPath = path.join(__dirname, '../../../public/', filePath);

            // move file to upload path
            await avatar.mv(uploadPath);

            // set file path to request body
            req.files.avatar.path = filePath;

            // proceed to next middleware
            return next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
