/**
 * @file /schemas/zod/umrah/packages/umrah-makka-hotel.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');
const { isURL } = require('validator');
const { UMRAH_PACKAGE_DISTANCE_UNITS } = require('../../../../constants');

// export umrah makka hotel schema
module.exports = z
    .object({
        makkahHotelNoOfNights: z
            .string({
                required_error: 'Makka hotel no of nights is required',
                invalid_type_error: 'Please provide a valid no. of nights in Makka hotel',
            })
            .refine((makkahHotelNoOfNights) => makkahHotelNoOfNights >= 0, {
                message: 'Please provide a valid no. of nights in Makka hotel',
            }),
        makkahHotelName: z
            .string({
                required_error: 'Makka hotel name is required',
                invalid_type_error: 'Please provide a valid makka hotel name',
            })
            .trim()
            .min(1, {
                message: 'Makka hotel name must be at least 1 characters',
            })
            .max(255, {
                message: 'Makka hotel name must be at most 255 characters',
            }),
        makkahHotelAddress: z
            .string({
                required_error: 'Makka hotel address is required',
                invalid_type_error: 'Please provide a valid makka hotel address',
            })
            .trim()
            .min(1, {
                message: 'Makka hotel address must be at least 1 characters',
            })
            .max(255, {
                message: 'Makka hotel address must be at most 255 characters',
            }),
        makkahHotelRating: z
            .string({
                required_error: 'Makka hotel rating is required',
                invalid_type_error: 'Please provide a valid makka hotel rating',
            })
            .refine((makkahHotelRating) => makkahHotelRating >= 0 && makkahHotelRating <= 5, {
                message: 'Please provide a valid makka hotel rating',
            }),
        makkahHotelDistance: z
            .string({
                required_error: 'Makka hotel distance is required',
                invalid_type_error: 'Please provide a valid makka hotel distance',
            })
            .trim()
            .min(1, {
                message: 'Makka hotel distance must be at least 1 characters',
            })
            .max(255, {
                message: 'Makka hotel distance must be at most 255 characters',
            }),
        makkahHotelDistanceUnit: z
            .string({
                required_error: 'Makka hotel distance unit is required',
                invalid_type_error: 'Please provide a valid makka hotel distance unit',
            })
            .refine(
                (makkahHotelDistanceUnit) =>
                    UMRAH_PACKAGE_DISTANCE_UNITS.includes(makkahHotelDistanceUnit),
                {
                    message: `Please provide a valid makka hotel distance unit. Available units are: ${UMRAH_PACKAGE_DISTANCE_UNITS.join(', ')}`,
                }
            ),
        makkahHotelWalkDuration: z
            .string({
                required_error: 'Makka hotel walk duration is required',
                invalid_type_error: 'Please provide a valid makka hotel walk duration',
            })
            .refine((makkahHotelWalkDuration) => makkahHotelWalkDuration >= 0, {
                message: 'Please provide a valid makka hotel walk duration',
            }),
        makkahHotelLocation: z
            .string({
                required_error: 'Makka hotel location is required',
                invalid_type_error: 'Please provide a valid makka hotel location',
            })
            .refine((makkahHotelLocation) => isURL(makkahHotelLocation), {
                message: 'Please provide a valid makka hotel location',
            }),
        makkahHotelNote: z
            .string({
                required_error: 'Makka hotel note is required',
                invalid_type_error: 'Please provide a valid makka hotel note',
            })
            .trim()
            .min(1, {
                message: 'Makka hotel note must be at least 1 characters',
            })
            .max(255, {
                message: 'Makka hotel note must be at most 255 characters',
            })
            .optional(),
    })
    .strict();
