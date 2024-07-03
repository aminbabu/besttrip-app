/**
 * @file /schemas/zod/settings/site/policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const { z } = require('zod');

// export site policy settings schema
module.exports = z
    .object({
        'about-us': z
            .string({
                required_error: 'About us content is required',
                invalid_type_error: 'Please provide valid about us content',
            })
            .trim()
            .min(3, {
                message: 'About us content should have at least 3 characters',
            })
            .optional(),
        'terms-of-conditions': z
            .string({
                required_error: 'Terms of conditions content is required',
                invalid_type_error:
                    'Please provide valid terms of conditions content',
            })
            .trim()
            .min(3, {
                message:
                    'Terms of conditions content should have at least 3 characters',
            })
            .optional(),
        'refund-policy': z
            .string({
                required_error: 'Refund policy content is required',
                invalid_type_error:
                    'Please provide valid refund policy content',
            })
            .trim()
            .min(3, {
                message:
                    'Refund policy content should have at least 3 characters',
            })
            .optional(),
        'privacy-policy': z
            .string({
                required_error: 'Privacy policy content is required',
                invalid_type_error:
                    'Please provide valid privacy policy content',
            })
            .trim()
            .min(3, {
                message:
                    'Privacy policy content should have at least 3 characters',
            })
            .optional(),
    })
    .strict();
