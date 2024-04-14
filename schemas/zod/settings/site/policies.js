/**
 * @file /schemas/zod/settings/site/policies.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { z } = require('zod');

// export site policies settings schema
module.exports = z.object({
    aboutUs: z
        .string({
            required_error: 'About us is required',
            invalid_type_error: 'About us should be a string',
        })
        .min(10, {
            message: 'About us should have at least 10 characters',
        })
        .optional(),
    termsOfConditions: z
        .string({
            required_error: 'Terms of conditions is required',
            invalid_type_error: 'Terms of conditions should be a string',
        })
        .min(10, {
            message: 'Terms of conditions should have at least 10 characters',
        })
        .optional(),
    returnPolicy: z
        .string({
            required_error: 'Return policy is required',
            invalid_type_error: 'Return policy should be a string',
        })
        .min(10, {
            message: 'Return policy should have at least 10 characters',
        })
        .optional(),
    privacyPolicy: z
        .string({
            required_error: 'Privacy policy is required',
            invalid_type_error: 'Privacy policy should be a string',
        })
        .min(10, {
            message: 'Privacy policy should have at least 10 characters',
        })
        .optional(),
});
