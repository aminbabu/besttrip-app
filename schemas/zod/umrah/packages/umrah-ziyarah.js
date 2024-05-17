/**
 * @file /schemas/zod/umrah/packages/umrah-ziyarah.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const { z } = require('zod');
const { UMRAH_PACKAGE_BOOLEAN } = require('../../../../constants');

// export umrah ziyarah schema
module.exports = z
    .object({
        ziyarahDays: z
            .string({
                required_error: 'Ziyarah days is required',
                invalid_type_error: 'Please provide a valid ziyarah days',
            })
            .refine((ziyarahDays) => ziyarahDays >= 0, {
                message: 'Please provide a valid ziyarah days',
            }),
        ziyarahMakkah: z
            .string({
                required_error: 'Ziyarah Makkah is required',
                invalid_type_error: 'Please provide a valid ziyarah Makkah',
            })
            .refine((ziyarahMakka) => UMRAH_PACKAGE_BOOLEAN.includes(ziyarahMakka.toLowerCase()), {
                message: `Please provide a valid ziyarah Makkah. Available options are: ${UMRAH_PACKAGE_BOOLEAN.join(', ')}`,
            }),
        ziyarahMadinah: z
            .string({
                required_error: 'Ziyarah Madinah is required',
                invalid_type_error: 'Please provide a valid ziyarah Madinah',
            })
            .refine(
                (ziyarahMadinah) => UMRAH_PACKAGE_BOOLEAN.includes(ziyarahMadinah.toLowerCase()),
                {
                    message: `Please provide a valid ziyarah Madinah. Available options are: ${UMRAH_PACKAGE_BOOLEAN.join(', ')}`,
                }
            ),
        ziyarahTaif: z
            .string({
                required_error: 'Ziyarah Taif is required',
                invalid_type_error: 'Please provide a valid ziyarah Taif',
            })
            .refine((ziyarahTaif) => UMRAH_PACKAGE_BOOLEAN.includes(ziyarahTaif.toLowerCase()), {
                message: `Please provide a valid ziyarah Taif. Available options are: ${UMRAH_PACKAGE_BOOLEAN.join(', ')}`,
            }),
        ziyarahMakkahDetails: z
            .array(
                z
                    .string({
                        required_error: 'Ziyarah Makkah detail is required',
                        invalid_type_error: 'Please provide a valid ziyarah Makkah detail',
                    })
                    .trim()
                    .min(1, {
                        message: 'Ziyarah Makkah detail must be at least 1 characters',
                    })
                    .max(255, {
                        message: 'Ziyarah Makkah detail must be at most 255 characters',
                    }),
                {
                    required_error: 'At least one ziyarah Makkah detail is required',
                    invalid_type_error: 'Please provide a valid ziyarah Makkah detail',
                }
            )
            .nonempty({
                message: 'At least one ziyarah Makkah detail is required',
            }),
        ziyarahMadinahDetails: z
            .array(
                z
                    .string({
                        required_error: 'Ziyarah Madinah detail is required',
                        invalid_type_error: 'Please provide a valid ziyarah Madinah detail',
                    })
                    .trim()
                    .min(1, {
                        message: 'Ziyarah Madinah detail must be at least 1 characters',
                    })
                    .max(255, {
                        message: 'Ziyarah Madinah detail must be at most 255 characters',
                    }),
                {
                    required_error: 'At least one ziyarah Madinah detail is required',
                    invalid_type_error: 'Please provide a valid ziyarah Madinah detail',
                }
            )
            .nonempty({
                message: 'At least one ziyarah Madinah detail is required',
            }),
        ziyarahTaifDetails: z
            .array(
                z
                    .string({
                        required_error: 'Ziyarah Taif detail is required',
                        invalid_type_error: 'Please provide a valid ziyarah Taif detail',
                    })
                    .trim()
                    .min(1, {
                        message: 'Ziyarah Taif detail must be at least 1 characters',
                    })
                    .max(255, {
                        message: 'Ziyarah Taif detail must be at most 255 characters',
                    }),
                {
                    required_error: 'At least one ziyarah Taif detail is required',
                    invalid_type_error: 'Please provide a valid ziyarah Taif detail',
                }
            )
            .nonempty({
                message: 'At least one ziyarah Taif detail is required',
            }),
        ziyarahNote: z
            .string({
                required_error: 'Ziyarah note is required',
                invalid_type_error: 'Please provide a valid ziyarah note',
            })
            .trim()
            .min(1, {
                message: 'Ziyarah note must be at least 1 characters',
            })
            .max(255, {
                message: 'Ziyarah note must be at most 255 characters',
            })
            .optional(),
    })
    .strict();
