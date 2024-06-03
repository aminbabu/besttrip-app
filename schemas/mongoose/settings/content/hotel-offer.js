/**
 * @file /schemas/mongoose/settings/content/hotel-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { HOTEL_STATUS } = require('../../../../constants');

// export hotel content settings schema
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
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
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
            enum: HOTEL_STATUS,
            required: [true, 'Status is required'],
        },
    },
    {
        timestamps: true,
    }
);
