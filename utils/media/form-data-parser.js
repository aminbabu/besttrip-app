/**
 * @file /utils/media/form-data-parser.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const { formidable } = require('formidable');

// export form data parser
module.exports = async (req, res, next) => {
    // parse form data
    const form = formidable({ multiples: true });

    try {
        const [fields, files] = await form.parse(req);

        console.log('fields:', fields);
        console.log('files:', files);

        // check if there is no file
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({
                message: 'No file uploaded',
            });
        }

        // populate req.body with fields
        req.body = fields;

        // populate req.files with files
        req.files = files;

        // call next middleware
        return next();
    } catch (err) {
        return next(err);
    }
};
