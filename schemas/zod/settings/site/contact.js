/**
 * @file /schemas/settings/site/contact.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 02 Jul, 2024
 */

// dependencies
const { isMobilePhone } = require('validator');
const { z } = require('zod');

// export contact settings schema
module.exports = z
    .object({
        email: z
            .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
            .email({
                message: 'Email must be a valid email address',
            }),
        phone: z
            .string({
                required_error: 'Phone is required',
                invalid_type_error: 'Phone must be a string',
            })
            .refine((phone) => isMobilePhone(phone), {
                message: 'Phone must be a valid phone number',
            }),
        facebook: z
            .string({
                required_error: 'Facebook is required',
                invalid_type_error: 'Facebook must be a string',
            })
            .url({
                message: 'Facebook must be a valid URL',
            })
            .optional(),
        twitter: z
            .string({
                required_error: 'Twitter is required',
                invalid_type_error: 'Twitter must be a string',
            })
            .url({
                message: 'Twitter must be a valid URL',
            })
            .optional(),
        instagram: z
            .string({
                required_error: 'Instagram is required',
                invalid_type_error: 'Instagram must be a string',
            })
            .url({
                message: 'Instagram must be a valid URL',
            })
            .optional(),
        youtube: z
            .string({
                required_error: 'Youtube is required',
                invalid_type_error: 'Youtube must be a string',
            })
            .url({
                message: 'Youtube must be a valid URL',
            })
            .optional(),
        linkedin: z
            .string({
                required_error: 'Linkedin is required',
                invalid_type_error: 'Linkedin must be a string',
            })
            .url({
                message: 'Linkedin must be a valid URL',
            })
            .optional(),
        address: z
            .string({
                required_error: 'Address is required',
                invalid_type_error: 'Address must be a string',
            })
            .min(3, {
                message: 'Address must be at least 3 characters',
            })
            .max(255, {
                message: 'Address must not be more than 255 characters',
            }),
    })
    .strict();
