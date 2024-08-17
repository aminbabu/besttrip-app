/**
 * @file /schemas/zod/umrah/packages/get-umrah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 28 July, 2024
 */

// dependencies
const { z } = require('zod');
const {
    UMRAH_PACKAGE_TYPES,
} = require('../../../../constants/umrah-package-types');
const {
    UMRAH_PACKAGE_SCHEDULES,
} = require('../../../../constants/umrah-pacakges');
const mongoose = require('mongoose');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
    try {
        return new mongoose.Types.ObjectId(id).toString() === id;
    } catch (error) {
        return false;
    }
};

// export get umrah packages schema
module.exports = z
    .object({
        packageSchedule: z
            .string({
                invalid_type_error: 'Please provide a valid package schedule',
            })
            .refine(
                (schedule) =>
                    !schedule ||
                    UMRAH_PACKAGE_SCHEDULES.includes(schedule.toLowerCase()),
                {
                    message: `Please provide a valid schedule. Available schedules are: ${UMRAH_PACKAGE_SCHEDULES.join(
                        ', '
                    )}`,
                }
            ),
        packageType: z
            .string({
                invalid_type_error: 'Package type must be a valid ObjectId',
            })
            .refine((id) => !id || isValidObjectId(id), {
                message:
                    'Please provide a valid MongoDB ObjectId for package type',
            }),
        packageDuration: z
            .string({
                invalid_type_error: 'Package duration must be a valid ObjectId',
            })
            .refine((id) => !id || isValidObjectId(id), {
                message:
                    'Please provide a valid MongoDB ObjectId for package duration',
            }),
        dataLength: z
            .number({
                invalid_type_error: 'Default data length must be a number',
            })
            .transform((value) => parseFloat(value))
            .refine((value) => !isNaN(value) && value >= 1, {
                message: 'Default data length must be at least 1',
            })
            .default(10), // Default value if not provided
        adultTravelers: z
            .number({
                invalid_type_error: 'Adult travelers must be a number',
            })
            .transform((value) => parseFloat(value))
            .refine((value) => !isNaN(value) && value >= 1, {
                message:
                    'Adult travelers must be a non-negative number or at least 1',
            }),
        childTravelers: z
            .number({
                invalid_type_error: 'Child travelers must be a number',
            })
            .transform((value) => parseFloat(value))
            .refine((value) => !isNaN(value) && value >= 0, {
                message: 'Child travelers must be a non-negative number',
            })
            .default(0),
        infantsTravelers: z
            .number({
                invalid_type_error: 'Infants travelers must be a number',
            })
            .transform((value) => parseFloat(value))
            .refine((value) => !isNaN(value) && value >= 0, {
                message: 'Infants travelers must be a non-negative number',
            })
            .default(0),
        lastItemId: z
            .union([
                z
                    .string({
                        invalid_type_error:
                            'Last item ID must be a valid ObjectId or null',
                    })
                    .refine((id) => !id || isValidObjectId(id), {
                        message:
                            'Please provide a valid MongoDB ObjectId or leave it empty',
                    }),
                z.null(),
            ])
            .optional(),
    })
    .strict();
