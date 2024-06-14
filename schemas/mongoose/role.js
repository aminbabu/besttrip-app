/**
 * @file /schemas/mongoose/role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export role schema
module.exports = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: [true, 'Name already exists'],
        },
        description: {
            type: String,
        },
        permissions: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);
