/**
 * @file /schemas/zod/umrah/packages/umrah-visa.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');
const { VISA_TYPES } = require('../../../../constants/api');

// export umrah visa schema
module.exports = z
    .object({
        visaType: z
            .string({
                required_error: 'Visa type is required',
                invalid_type_error: 'Please provide a valid visa type',
            })
            .refine((visaType) => VISA_TYPES.includes(visaType.toLowerCase()), {
                message: `Please provide a valid visa type. Available types are: ${VISA_TYPES.join(', ')}`,
            }),
        visaNoOfEntries: z
            .string({
                required_error: 'Visa no of entries is required',
                invalid_type_error: 'Please provide a valid visa no of entries',
            })
            .refine((visaNoOfEntries) => visaNoOfEntries > 0, {
                message: 'Please provide a valid visa no of entries',
            }),
        visaDuration: z
            .string({
                required_error: 'Visa duration is required',
                invalid_type_error: 'Please provide a valid visa duration',
            })
            .refine((visaDuration) => visaDuration > 0, {
                message: 'Please provide a valid visa duration',
            }),
        visaValidity: z
            .string({
                required_error: 'Visa validity is required',
                invalid_type_error: 'Please provide a valid visa validity',
            })
            .refine((visaValidity) => visaValidity > 0, {
                message: 'Please provide a valid visa validity',
            }),
        visaOptions: z
            .array(
                z
                    .string({
                        required_error: 'Visa option is required',
                        invalid_type_error: 'Please provide a valid visa option',
                    })
                    .trim()
                    .min(1, {
                        message: 'Visa option must be at least 1 characters',
                    })
                    .max(255, {
                        message: 'Visa option must be at most 255 characters',
                    }),
                {
                    required_error: 'At least one visa option is required',
                    invalid_type_error: 'Please provide a valid visa option',
                }
            )
            .nonempty({
                message: 'At least one visa option is required',
            }),
        visaNote: z
            .string({
                required_error: 'Visa note is required',
                invalid_type_error: 'Please provide a valid visa note',
            })
            .trim()
            .min(1, {
                message: 'Visa note must be at least 1 characters',
            })
            .max(255, {
                message: 'Visa note must be at most 255 characters',
            })
            .optional(),
    })
    .strict();
