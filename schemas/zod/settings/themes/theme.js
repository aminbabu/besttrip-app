/**
 * @file /schemas/zod/settings/themes/theme.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { z } = require('zod');
const { THEME_NAMES } = require('../../../../constants');

// export theme settings schema
module.exports = z
    .object({
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
        theme: z
            .string({
                required_error: 'Theme name is required',
                invalid_type_error: 'Please provide a valid theme name',
            })
            .refine((theme) => THEME_NAMES.includes(theme), {
                message: 'Please provide a valid theme name',
            }),
    })
    .strict();
