/**
 * @file /schemas/zod/settings/content/section.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { z } = require('zod');
const { SECTION_NAMES } = require('../../../../constants');

// export content sections settings schema
module.exports = z
    .object({
        key: z
            .string({
                required_error: 'Section key is required',
                invalid_type_error: 'Please provide a valid section key',
            })
            .refine((name) => SECTION_NAMES.includes(name), {
                message: 'Please provide a valid section key',
            }),
        title: z
            .string({
                required_error: 'Title is required',
                invalid_type_error: 'Please provide a valid title',
            })
            .min(3, {
                message: 'Title should be at least 3 characters',
            })
            .max(255, {
                message: 'Title should not be more than 255 characters',
            }),
        description: z
            .string({
                required_error: 'Description is required',
                invalid_type_error: 'Please provide a valid description',
            })
            .min(3, {
                message: 'Description should be at least 3 characters',
            })
            .max(500, {
                message: 'Description should not be more than 500 characters',
            }),
    })
    .strict();
