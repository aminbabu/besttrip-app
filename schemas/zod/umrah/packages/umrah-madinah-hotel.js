/**
 * @file /schemas/zod/umrah/packages/umrah-madinah-hotel.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');
const { UMRAH_PACKAGE_DISTANCE_UNITS } = require('../../../../constants');

// export umrah madinah hotel schema
module.exports = z
    .object({
        madinahHotelNoOfNights: z
            .string({
                required_error: 'Madina hotel no of nights is required',
                invalid_type_error: 'Please provide a valid no. of nights in Madina hotel',
            })
            .refine((madinahHotelNoOfNights) => madinahHotelNoOfNights >= 0, {
                message: 'Please provide a valid no. of nights in Madina hotel',
            }),
        madinahHotelName: z
            .string({
                required_error: 'Madina hotel name is required',
                invalid_type_error: 'Please provide a valid madina hotel name',
            })
            .trim()
            .min(1, {
                message: 'Madina hotel name must be at least 1 characters',
            })
            .max(255, {
                message: 'Madina hotel name must be at most 255 characters',
            }),
        madinahHotelAddress: z
            .string({
                required_error: 'Madina hotel address is required',
                invalid_type_error: 'Please provide a valid madina hotel address',
            })
            .trim()
            .min(1, {
                message: 'Madina hotel address must be at least 1 characters',
            })
            .max(255, {
                message: 'Madina hotel address must be at most 255 characters',
            }),
        madinahHotelRating: z
            .string({
                required_error: 'Madina hotel rating is required',
                invalid_type_error: 'Please provide a valid madina hotel rating',
            })
            .refine((madinahHotelRating) => madinahHotelRating >= 0, {
                message: 'Please provide a valid madina hotel rating',
            }),
        madinahHotelDistance: z
            .string({
                required_error: 'Madina hotel distance is required',
                invalid_type_error: 'Please provide a valid madina hotel distance',
            })
            .trim()
            .min(1, {
                message: 'Madina hotel distance must be at least 1 characters',
            })
            .max(255, {
                message: 'Madina hotel distance must be at most 255 characters',
            }),
        madinahHotelDistanceUnit: z
            .string({
                required_error: 'Madina hotel distance unit is required',
                invalid_type_error: 'Please provide a valid madina hotel distance unit',
            })
            .refine(
                (madinahHotelDistanceUnit) =>
                    UMRAH_PACKAGE_DISTANCE_UNITS.includes(madinahHotelDistanceUnit),
                {
                    message: `Please provide a valid madina hotel distance unit. Available units are: ${UMRAH_PACKAGE_DISTANCE_UNITS.join(', ')}`,
                }
            ),
        madinahHotelWalkDuration: z
            .string({
                required_error: 'Madina hotel walk duration is required',
                invalid_type_error: 'Please provide a valid madina hotel walk duration',
            })
            .trim()
            .min(1, {
                message: 'Madina hotel walk duration must be at least 1 characters',
            })
            .max(255, {
                message: 'Madina hotel walk duration must be at most 255 characters',
            }),
        madinahHotelLocation: z
            .string({
                required_error: 'Madina hotel location is required',
                invalid_type_error: 'Please provide a valid madina hotel location',
            })
            .trim()
            .min(1, {
                message: 'Madina hotel location must be at least 1 characters',
            })
            .max(255, {
                message: 'Madina hotel location must be at most 255 characters',
            }),
        madinahHotelNote: z
            .string({
                required_error: 'Madina hotel note is required',
                invalid_type_error: 'Please provide a valid madina hotel note',
            })
            .trim()
            .min(1, {
                message: 'Madina hotel note must be at least 1 characters',
            })
            .max(255, {
                message: 'Madina hotel note must be at most 255 characters',
            })
            .optional(),
    })
    .strict();
