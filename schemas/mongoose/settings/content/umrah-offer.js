/**
 * @file /schemas/mongoose/settings/content/umrah-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { UMRAH_STATUS, UMRAH_INCLUSIONS } = require('../../../../constants');

// export umrah content settings schema
module.exports = new Schema(
    {
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required'],
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        duration: {
            type: String,
            required: [true, 'Duration is required'],
        },
        inclusions: {
            type: [String],
            enum: UMRAH_INCLUSIONS,
            required: [true, 'Inclusions is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
        },
        link: {
            type: String,
            required: [true, 'Link is required'],
        },
        status: {
            type: String,
            enum: UMRAH_STATUS,
            required: [true, 'Status is required'],
        },
    },
    {
        timestamps: true,
    }
);
