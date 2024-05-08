/**
 * @file /schemas/mongoose/settings/content/blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { BLOG_STATUS } = require('../../../../constants');

// export blog post content settings schema
module.exports = new Schema(
    {
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required'],
        },
        banner: {
            type: String,
            required: [true, 'Banner is required'],
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        subtitle: {
            type: String,
            required: [true, 'Subtitle is required'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        nearestAirport: {
            type: String,
            required: [true, 'Nearest airport is required'],
        },
        domesticAirlines: {
            type: Array,
            required: [true, 'Domestic airlines is required'],
        },
        status: {
            type: String,
            enum: BLOG_STATUS,
            required: [true, 'Status is required'],
        },
    },
    {
        timestamps: true,
    }
);
