/**
 * @file /schemas/zod/settings/content/exclusive-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { isMongoId } = require('validator');
const { z } = require('zod');
const { EXCLUSIVE_STATUS } = require('../../../../constants');

// export exclusive content settings schema
module.exports = z
    .object({
        id: z
            .string({
                required_error: 'Id is required.',
                invalid_type_error: 'Please provide a valid id.',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id.',
            }),
        link: z
            .string({
                required_error: 'Link is required.',
                invalid_type_error: 'Please provide a valid link.',
            })
            .url({
                message: 'Please provide a valid link.',
            }),
        status: z
            .string({
                required_error: 'Status is required.',
                invalid_type_error: 'Please provide a valid status.',
            })
            .refine((status) => EXCLUSIVE_STATUS.includes(status), {
                message: 'Please provide a valid status.',
            }),
    })
    .strict();
