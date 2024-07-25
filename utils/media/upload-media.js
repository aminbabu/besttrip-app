/**
 * @file /utils/media/upload-media.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 10 April, 2024
 * @update_date 10 April, 2024
 */

// export upload media middleware
module.exports = (directory) => (req, res, next) => {
    // get files
    const { files } = req;

    const oldpath = files.filetoupload.filepath;
    const newpath = `${__dirname}/../../../public/uploads/${directory}/${files.filetoupload.filename}`;

    // call next middleware
    return next();
};
