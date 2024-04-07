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
const { DEFAULT_FILE_SIZE } = require('../../constants/_globals');
const { DEFAULT_IMAGE_TYPES } = require('../../constants/_media-files');

// create default storage
const createStorage = (distFolder) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, '../../public/uploads', distFolder);
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
    });

// export upload media files
module.exports = (
    fileSize = DEFAULT_FILE_SIZE,
    mimeTypes = DEFAULT_IMAGE_TYPES,
    distFolder = 'media',
    storage = null
) =>
    multer({
        storage: storage || createStorage(distFolder),
        limits: {
            fileSize: fileSize || DEFAULT_FILE_SIZE,
        },
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if (mimeTypes.includes(ext)) {
                cb(null, true);
            } else {
                cb(new Error(`Invalid file type. Only ${mimeTypes.join(', ')} files are allowed.`));
            }
        },
    });
