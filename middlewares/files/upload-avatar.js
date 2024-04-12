/**
 * @file middlewares/files/upload-avatar.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 12 April, 2024
 * @update_date 12 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { Customer } = require('../../models');

// export upload avatar middleware
module.exports =
    (dir = '/uploads') =>
    async (req, res, next) => {
        try {
            // get id
            const { id } = req.params;

            // get avatar
            const { avatar } = req.files;

            // prepare file path
            const filePath = path.join('uploads/avatars/', `${dir}/${Date.now()}_${avatar.name}`);
            const uploadPath = path.join(__dirname, '../../public/', filePath);

            // move file to upload path
            await avatar.mv(uploadPath);

            // set file path to request body
            req.body.avatar = filePath;

            // get customer
            const customer = await Customer.findById(id);

            // check if customer exists
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            // check if customer has avatar
            if (customer.avatar) {
                // delete previous avatar
                fs.unlinkSync(path.join(__dirname, '../../public/', customer.avatar));
            }

            // continue to next middleware
            return next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
