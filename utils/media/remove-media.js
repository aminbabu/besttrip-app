/**
 * @file /utils/media/form-data-parser.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');

// export remove media files middleware
module.exports = (mediaPaths) => {
    try {
        // remove media files
        mediaPaths.forEach((mediaPath) => {
            fs.unlinkSync(path.join(__dirname, '../../public', mediaPath));
        });

        // return success
        return true;
    } catch (error) {
        console.error('Error removing media files:', error);

        // log error
        return error;
    }
};
