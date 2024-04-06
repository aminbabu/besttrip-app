/**
 * @file /utils/file-uploader.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 06 April, 2024
 * @update_date 06 April, 2024
 */

// dependencies
const fs = require('fs/promises');
const path = require('path');

// export file uploader
module.exports = async (file, distpath) => {
    try {
        // check if file is empty
        if (!file) {
            return null;
        }

        // get old path
        const oldPath = file.filepath;

        // define new universal path
        const filepath = path.join('../public', distpath, file.originalFilename);

        // define new path
        const newPath = path.join(__dirname, filepath);

        // check if file exists
        const exists = await fs
            .access(newPath)
            .then(() => true)
            .catch(() => false);

        // remove old file
        if (exists) {
            await fs.unlink(newPath);
        }

        // copy file to new path
        await fs.copyFile(oldPath, newPath);

        // remove old file
        await fs.unlink(oldPath);

        // return new file
        return {
            filename: file.originalFilename,
            filepath: distpath + file.originalFilename,
            size: file.size,
            type: path.extname(file.originalFilename),
        };
    } catch (error) {
        return null;
    }
};
