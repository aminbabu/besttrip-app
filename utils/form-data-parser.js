/**
 * @file /utils/form-data-parser.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 06 April, 2024
 * @update_date 06 April, 2024
 */

// dependencies
const { formidable } = require('formidable');

// export form data parser
module.exports = async (req, res, next) => {
    // create form data parser
    const form = formidable({ multiples: true });

    try {
        // parse form data
        const [fields, files] = await form.parse(req);

        // set form data to request
        req.body = { ...req.body, ...fields, files };

        // next middleware
        return next();
    } catch (error) {
        return next(error);
    }
};
