/**
 * @file /schemas/mongoose/settings/content/flight-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { FLIGHT_STATUS, FLIGHT_TYPE } = require('../../../../constants');

// export flight content settings schema
module.exports = new Schema(
    {
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required'],
        },
        flightType: {
            type: String,
            enum: FLIGHT_TYPE,
            required: [true, 'Flight type is required'],
        },
        departure: {
            type: String,
            required: [true, 'Departure is required'],
        },
        arrival: {
            type: String,
            required: [true, 'Arrival is required'],
        },
        airline: {
            type: String,
            required: [true, 'Airline is required'],
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
            enum: FLIGHT_STATUS,
            required: [true, 'Status is required'],
        },
    },
    {
        timestamps: true,
    }
);
