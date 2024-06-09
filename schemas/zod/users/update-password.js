/**
 * @file /schemas/zod/users/update-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 09 June, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');

// export update password schema
module.exports = z
    .object({
        id: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        currentPassword: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .min(8, 'Password must be at least 8 characters long.'),
        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .min(8, 'Password must be at least 8 characters long.'),
        confirmPassword: z
            .string({
                required_error: 'Confirm password is required',
                invalid_type_error: 'Confirm password must be a string',
            })
            .min(8, 'Confirm password must be at least 8 characters long.')
            .refine(({ password, confirmPassword }) => password === confirmPassword, {
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            }),
    })
    .strict();
