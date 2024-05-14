/**
 * @file /schemas/zod/umrah/packages/umrah-transportation.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');

// export umrah transportation schema
module.exports = z
    .object({
        transportType: z
            .string({
                required_error: 'Transport type is required',
                invalid_type_error: 'Please provide a valid transport type',
            })
            .trim()
            .min(1, {
                message: 'Transport type must be at least 1 characters',
            })
            .max(255, {
                message: 'Transport type must be at most 255 characters',
            }),
        transportAirportToHotel: z
            .string({
                required_error: 'Transport airport to hotel is required',
                invalid_type_error: 'Please provide a valid transport airport to hotel',
            })
            .refine(
                (transportAirportToHotel) =>
                    ['yes', 'no'].includes(transportAirportToHotel.toLowerCase()),
                {
                    message: 'Please provide a valid transport airport to hotel',
                }
            ),
        transportVisitorPlaces: z
            .string({
                required_error: 'Transport visitor places is required',
                invalid_type_error: 'Please provide a valid transport visitor places',
            })
            .refine(
                (transportVisitorPlaces) =>
                    ['yes', 'no'].includes(transportVisitorPlaces.toLowerCase()),
                {
                    message: 'Please provide a valid transport visitor places',
                }
            ),
        transportHotelToAirport: z
            .string({
                required_error: 'Transport hotel to airport is required',
                invalid_type_error: 'Please provide a valid transport hotel to airport',
            })
            .refine(
                (transportHotelToAirport) =>
                    ['yes', 'no'].includes(transportHotelToAirport.toLowerCase()),
                {
                    message: 'Please provide a valid transport hotel to airport',
                }
            ),
        transportServices: z
            .array(
                z
                    .string({
                        required_error: 'Transport service is required',
                        invalid_type_error: 'Please provide a valid transport service',
                    })
                    .trim()
                    .min(1, {
                        message: 'Transport service must be at least 1 characters',
                    }),
                {
                    required_error: 'At least one transport service is required',
                    invalid_type_error: 'Please provide a valid transport service',
                }
            )
            .nonempty({
                message: 'At least one transport service is required',
            }),
        transportServiceTypes: z
            .array(
                z
                    .string({
                        required_error: 'Transport service type is required',
                        invalid_type_error: 'Please provide a valid transport service type',
                    })
                    .trim()
                    .min(1, {
                        message: 'Transport service type must be at least 1 characters',
                    })
                    .max(255, {
                        message: 'Transport service type must be at most 255 characters',
                    }),
                {
                    required_error: 'At least one transport service type is required',
                    invalid_type_error: 'Please provide a valid transport service type',
                }
            )
            .nonempty({
                message: 'At least one transport service type is required',
            }),
        transportNote: z
            .string({
                required_error: 'Transport note is required',
                invalid_type_error: 'Please provide a valid transport note',
            })
            .trim()
            .min(1, {
                message: 'Transport note must be at least 1 characters',
            })
            .max(255, {
                message: 'Transport note must be at most 255 characters',
            })
            .optional(),
    })
    .strict();
