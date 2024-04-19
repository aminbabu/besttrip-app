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
const { SECTIONS } = require('../../../../constants');

// export section content settings schema
module.exports = new Schema(
    {
        section: {
            type: String,
            enum: SECTIONS,
            required: [true, 'Section is required'],
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
