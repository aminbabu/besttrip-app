/**
 * @file /schemas/mongoose/settings/theme.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 25 Jul, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { THEME_NAMES, THEME_STATUS } = require('../../../constants');

// export theme settings schema
module.exports = new Schema(
    {
        theme: {
            type: String,
            enum: THEME_NAMES,
            required: [true, 'Theme name is required'],
            unique: [true, 'Theme name must be unique'],
        },
        illustration: {
            type: String,
            required: [true, 'Illustration is required'],
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        status: {
            type: String,
            enum: THEME_STATUS,
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
