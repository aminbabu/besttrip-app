/**
 * @file /utils/global/uploader.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// upload media files
const uploadMedia = (fileTypes, folder, storage) =>
    multer({
        storage: storage({
            destination: (req, file, cb) => {
                const uploadPath = path.join(__dirname, `../../public/uploads/${folder}`);
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const filename = uuidv4() + ext;
                cb(null, filename);
            },
        }),
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if (fileTypes.includes(ext)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type'));
            }
        },
    });

// export module
module.exports = {
    uploadMedia,
};
