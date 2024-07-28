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

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

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
                invalid_type_error: 'Please provide a valid package type',
            })
            .refine(
                (type) =>
                    !type || UMRAH_PACKAGE_TYPES.includes(type.toLowerCase()),
                {
                    message: `Please provide a valid type. Available types are: ${UMRAH_PACKAGE_TYPES.join(
                        ', '
                    )}`,
                }
            ),
        packageDuration: z
            .string({
                invalid_type_error: 'Package duration must be a number',
            })
            .transform((value) => parseFloat(value))
            .refine((value) => !isNaN(value) && value >= 1, {
                message: 'Package duration must be at least 1 day',
            }),
        dataLength: z
            .string({
                invalid_type_error: 'Default data length must be a number',
            })
            .transform((value) => parseFloat(value))
            .refine((value) => !isNaN(value) && value >= 1, {
                message: 'Default data length must be at least 1',
            })
            .default(10), // Default value if not provided
    })
    .strict();
