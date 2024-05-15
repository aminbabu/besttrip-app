/**
 * @file /utils/umrah/package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 May, 2024
 * @update_date 15 May, 2024
 */

// filter request from zod schema
const filterReqFromZodSchema = (body, schema) => {
    // data object
    const data = {};

    // filter request body object according to schema
    Object.keys(schema).forEach((key) => {
        if (body[key]) {
            data[key] = body[key];
        }
    });

    // return filtered data
    return data;
};

// export
module.exports = {
    filterReqFromZodSchema,
};
