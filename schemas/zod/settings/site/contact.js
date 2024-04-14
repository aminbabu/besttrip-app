/**
 * @file /schemas/settings/site/contact.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
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
        social: z
            .array(
                z.object({
                    name: z
                        .string({
                            required_error: 'Name is required',
                            invalid_type_error: 'Name must be a string',
                        })
                        .min(3, {
                            message: 'Name must be at least 3 characters',
                        })
                        .max(255, {
                            message: 'Name must not be more than 255 characters',
                        }),
                    url: z
                        .string({
                            required_error: 'URL is required',
                            invalid_type_error: 'URL must be a string',
                        })
                        .url({
                            message: 'URL must be a valid URL',
                        }),
                })
            )
            .min(1, {
                message: 'At least one social media handle is required',
            }),
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
