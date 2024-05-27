/**
 * @file /schemas/zod/settings/site/policy.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 16 April, 2024
 */

// dependencies
const { z } = require('zod');
const { POLICY_KEYS } = require('../../../../constants/api');

// export site policy settings schema
module.exports = z
    .object({
        key: z
            .string({
                required_error: 'Policy key is required',
                invalid_type_error: 'Please provide a valid policy key',
            })
            .refine((key) => POLICY_KEYS.includes(key), {
                message: 'Please provide a valid policy key',
            }),
        content: z
            .string({
                required_error: 'Content is required',
                invalid_type_error: 'Please provide a valid content',
            })
            .trim()
            .min(3, {
                message: 'Content should have at least 3 characters',
            }),
    })
    .strict();
