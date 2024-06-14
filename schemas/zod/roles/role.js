/**
 * @file schemas/zod/roles/role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');

// export role schema
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
        name: z
            .string({
                required_error: 'Name is required',
                invalid_type_error: 'Please provide a valid name',
            })
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must not exceed 50 characters'),
        description: z
            .string({
                required_error: 'Description is required',
                invalid_type_error: 'Please provide a valid description',
            })
            .min(3, 'Description must be at least 3 characters')
            .max(255, 'Description must not exceed 255 characters'),
        permissions: z
            .array(
                z
                    .string()
                    .min(3, 'Permission must be at least 3 characters')
                    .max(50, 'Permission must not exceed 50 characters')
            )
            .default([]),
    })
    .strict();
