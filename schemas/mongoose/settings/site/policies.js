/**
 * @file /schemas/mongoose/settings/site/policies.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');

// export customer schema
module.exports = new Schema(
    {
        key: {
            type: String,
            unique: [true, `Key - ${this.key} already exists`],
        },
        content: {
            type: String,
            required: [() => this.key, `Value - ${this.content} is required`],
        },
    },
    { timestamps: true }
);
