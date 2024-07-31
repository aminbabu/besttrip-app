/**
 * @file /schemas/zod/settings/content/flight-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { isMongoId } = require('validator');
const { z } = require('zod');
const { FLIGHT_STATUS, FLIGHT_TYPE } = require('../../../../constants');

// export flight content settings schema
module.exports = z
    .object({
        ids: z
            .array(
                z.string({
                    required_error: 'IDs are required',
                    invalid_type_error: 'Please provide valid IDs',
                })
            )
            .nonempty({
                message: 'IDs array must not be empty',
            }),
        id: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        flightType: z
            .string({
                required_error: 'Flight type is required',
                invalid_type_error: 'Please provide a valid flight type',
            })
            .refine((flightType) => FLIGHT_TYPE.includes(flightType), {
                message: 'Please provide a valid flight type',
            }),
        departure: z
            .string({
                required_error: 'Departure is required',
                invalid_type_error: 'Please provide a valid departure',
            })
            .trim()
            .min(3, {
                message: 'Departure must be at least 3 characters',
            })
            .max(255, {
                message: 'Departure must not be greater than 255 characters',
            }),
        arrival: z
            .string({
                required_error: 'Arrival is required',
                invalid_type_error: 'Please provide a valid arrival',
            })
            .trim()
            .min(3, {
                message: 'Arrival must be at least 3 characters',
            })
            .max(255, {
                message: 'Arrival must not be greater than 255 characters',
            }),
        airline: z
            .string({
                required_error: 'Airline is required',
                invalid_type_error: 'Please provide a valid airline',
            })
            .trim()
            .min(3, {
                message: 'Airline must be at least 3 characters',
            })
            .max(255, {
                message: 'Airline must not be greater than 255 characters',
            }),
        price: z
            .string({
                required_error: 'Price is required',
                invalid_type_error: 'Please provide a valid price',
            })
            .refine((price) => Number(price) >= 0, {
                message: 'Please provide a valid price',
            }),
        link: z
            .string({
                required_error: 'Link is required',
                invalid_type_error: 'Please provide a valid link',
            })
            .url({
                message: 'Please provide a valid link',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => FLIGHT_STATUS.includes(status), {
                message: 'Please provide a valid status',
            }),
    })
    .strict();
