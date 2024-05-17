/**
 * @file /schemas/zod/umrah/packages/umrah.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const { z } = require('zod');

// export umrah schema
module.exports = z
    .object({
        umrahTitle: z
            .string({
                required_error: 'Umrah title is required',
                invalid_type_error: 'Please provide a valid umrah title',
            })
            .trim()
            .min(1, {
                message: 'Umrah title must be at least 1 characters',
            })
            .max(255, {
                message: 'Umrah title must be at most 255 characters',
            }),
        umrahExcerpt: z
            .string({
                required_error: 'Umrah exerpt is required',
                invalid_type_error: 'Please provide a valid umrah exerpt',
            })
            .trim()
            .min(1, {
                message: 'Umrah exerpt must be at least 1 characters',
            })
            .max(255, {
                message: 'Umrah exerpt must be at most 255 characters',
            }),
        umrahDescription: z
            .string({
                required_error: 'Umrah description is required',
                invalid_type_error: 'Please provide a valid umrah description',
            })
            .trim()
            .min(1, {
                message: 'Umrah description must be at least 1 characters',
            }),
    })
    .strict();
