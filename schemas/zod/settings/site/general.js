/**
 * @file /schemas/settings/site/general.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 02 Jul, 2024
 */

// dependencies
const { z } = require('zod');

// export general settings schema
module.exports = z
    .object({
        title: z
            .string({
                required_error: 'Title is required',
                invalid_type_error: 'Title must be a string',
            })
            .min(3, {
                message: 'Title must be at least 3 characters',
            })
            .max(50, {
                message: 'Title must not be more than 50 characters',
            }),
        domains: z
            .array(
                z
                    .string({
                        required_error: 'Domain is required',
                        invalid_type_error: 'Domain must be a string',
                    })
                    .url({
                        message: 'Domain must be a valid URL',
                    })
            )
            .nonempty({
                message: 'At least one domain is required',
            }),
        description: z
            .string({
                required_error: 'Description is required',
                invalid_type_error: 'Description must be a string',
            })
            .min(3, {
                message: 'Description must be at least 3 characters',
            })
            .max(255, {
                message: 'Description must not be more than 255 characters',
            })
            .optional(),
    })
    .strict();
