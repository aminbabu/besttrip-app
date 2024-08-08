/**
 * @file /schemas/zod/umrah/packages/umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 15 May, 2024
 */

// dependencies
const { z } = require('zod');
const moment = require('moment');
const {
    UMRAH_PACKAGE_STATUS,
    UMRAH_PACKAGE_SCHEDULES,
    UMRAH_PACKAGE_INCLUSIONS,
    UMRAH_PACKAGE_TYPES,
} = require('../../../../constants');
const { UMRAH_INCLUSIONS } = require('../../../../constants/umrah-offers');

// export umrah package schema
module.exports = z
    .object({
        title: z
            .string({
                required_error: 'Title is required',
                invalid_type_error: 'Please provide a valid title',
            })
            .trim()
            .min(1, {
                message: 'Title must be at least 1 characters',
            }),
        subtitle: z
            .string({
                required_error: 'Subtitle is required',
                invalid_type_error: 'Please provide a valid subtitle',
            })
            .trim()
            .min(1, {
                message: 'Subtitle must be at least 1 characters',
            })
            .max(255, {
                message: 'Subtitle must be at most 255 characters',
            }),
        departureLocation: z
            .string({
                required_error: 'Departure location is required',
                invalid_type_error: 'Please provide a valid departure location',
            })
            .trim()
            .min(1, {
                message: 'Departure location must be at least 1 characters',
            })
            .max(255, {
                message: 'Departure location must be at most 255 characters',
            }),
        schedule: z
            .string({
                required_error: 'Schedule is required',
                invalid_type_error: 'Please provide a valid schedule',
            })
            .refine(
                (schedule) =>
                    UMRAH_PACKAGE_SCHEDULES.includes(schedule.toLowerCase()),
                {
                    message: `Please provide a valid schedule. Available schedules are: ${UMRAH_PACKAGE_SCHEDULES.join(
                        ', '
                    )}`,
                }
            ),
        journeyDate: z
            .string({
                required_error: 'Journey date is required',
                invalid_type_error: 'Please provide a valid journey date',
            })
            .refine(
                (journeyDate) =>
                    moment(journeyDate, 'YYYY-MM-DD', true).isValid(),
                {
                    message: 'Please provide a valid journey date',
                }
            ),
        expiryDate: z
            .string({
                required_error: 'Expiry date is required',
                invalid_type_error: 'Please provide a valid expiry date',
            })
            .refine(
                (expiryDate) =>
                    moment(expiryDate, 'YYYY-MM-DD', true).isValid(),
                {
                    message: 'Please provide a valid expiry date',
                }
            ),
        type: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => UMRAH_PACKAGE_STATUS.includes(status), {
                message: `Please provide a valid status. Available statuses are: ${UMRAH_PACKAGE_STATUS.join(
                    ', '
                )}`,
            }),
        adultPrice: z
            .string({
                required_error: 'Adult price is required',
                invalid_type_error: 'Please provide a valid adult price',
            })
            .refine((adultPrice) => parseFloat(adultPrice) >= 0, {
                message: 'Please provide a valid adult price',
            }),
        adultPartialPrice: z
            .string({
                required_error: 'Adult partial price is required',
                invalid_type_error:
                    'Please provide a valid adult partial price',
            })
            .refine((adultPartialPrice) => parseFloat(adultPartialPrice) >= 0, {
                message: 'Please provide a valid adult partial price',
            })
            .optional(),
        childPrice: z
            .string({
                required_error: 'Child price is required',
                invalid_type_error: 'Please provide a valid child price',
            })
            .refine((childPrice) => parseFloat(childPrice) >= 0, {
                message: 'Please provide a valid child price',
            }),
        childPartialPrice: z
            .string({
                required_error: 'Child partial price is required',
                invalid_type_error:
                    'Please provide a valid child partial price',
            })
            .refine((childPartialPrice) => parseFloat(childPartialPrice) >= 0, {
                message: 'Please provide a valid child partial price',
            })
            .optional(),
        infantPrice: z
            .string({
                required_error: 'Infant price is required',
                invalid_type_error: 'Please provide a valid infant price',
            })
            .refine((infantPrice) => parseFloat(infantPrice) >= 0, {
                message: 'Please provide a valid infant price',
            }),
        infantPartialPrice: z
            .string({
                required_error: 'Infant partial price is required',
                invalid_type_error:
                    'Please provide a valid infant partial price',
            })
            .refine(
                (infantPartialPrice) => parseFloat(infantPartialPrice) >= 0,
                {
                    message: 'Please provide a valid infant partial price',
                }
            )
            .optional(),
        seats: z
            .string({
                required_error: 'Seats is required',
                invalid_type_error: 'Please provide valid number of seats',
            })
            .refine((seats) => seats >= 0, {
                message: 'Please provide a valid number of seats',
            }),
        inclusions: z
            .union([
                z
                    .string({
                        invalid_type_error: 'Please provide valid inclusions',
                    })
                    .transform((inclusion) => inclusion.split(',')),
                z.array(
                    z.string({
                        invalid_type_error: 'Please provide valid inclusions',
                    })
                ),
            ])
            .transform((inclusions) =>
                Array.isArray(inclusions) ? inclusions : [inclusions]
            )
            .refine(
                (inclusions) =>
                    inclusions.every((inclusion) =>
                        UMRAH_INCLUSIONS.includes(inclusion)
                    ),
                {
                    message: `Please provide valid inclusions. Available options are ${UMRAH_INCLUSIONS.join(
                        ', '
                    )}`,
                }
            ),
    })
    .strict();
