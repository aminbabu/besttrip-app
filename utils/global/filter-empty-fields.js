/**
 * @file /utils/global/filter-empty-fields.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const { matchedData } = require('express-validator');

// export filter empty fields
module.exports = (req) => {
    // get validated data
    const validatedData = matchedData(req);

    // filter out empty fields
    return Object.keys(validatedData).reduce((acc, key) => {
        if (validatedData[key]) {
            acc[key] = validatedData[key];
        }
        return acc;
    }, {});
};
