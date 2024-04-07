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
const { DEFAULT_FILE_SIZE, DEFAULT_IMAGE_TYPES } = require('../../constants');

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
            const filename = `${file.fieldname.split(' ').join('_').toLowerCase()}-${uuidv4()}${ext}`;
            cb(null, filename);
        },
    });

// create default file filter
const createFileFilter = (mimeTypes) => (req, file, cb) => {
    // get file extension and mime type
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    // check if file type is allowed
    if (mimeTypes.includes(mimeType)) {
        cb(null, true);
    } else {
        cb(
            new multer.MulterError(
                'LIMIT_UNEXPECTED_FILE',
                `Invalid file type: ${ext}. Only ${mimeTypes.join(', ')} files are allowed.`
            ),
            false
        );
    }
};

// export default uploader
module.exports = (
    distFolder = 'media',
    fileFilter = null,
    mimeTypes = DEFAULT_IMAGE_TYPES,
    fileSize = DEFAULT_FILE_SIZE,
    storage = null
) =>
    multer({
        storage: storage || createStorage(distFolder),
        limits: {
            fileSize,
        },
        fileFilter: fileFilter || createFileFilter(mimeTypes),
    });
