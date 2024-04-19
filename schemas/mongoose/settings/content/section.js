/**
 * @file /schemas/mongoose/settings/content/sections.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { SECTION_NAMES } = require('../../../../constants');

// export section content settings schema
module.exports = new Schema(
    {
        key: {
            type: String,
            enum: SECTION_NAMES,
            required: [true, 'Section key is required'],
            unique: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
    },
    {
        timestamps: true,
    }
);
