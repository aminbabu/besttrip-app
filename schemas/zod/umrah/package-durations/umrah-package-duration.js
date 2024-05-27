/**
 * @file /schemas/zod/umrah/package-durations/umrah-package-duration.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 12 May, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');
const { UMRAH_PACKAGE_DURATION_STATUS } = require('../../../../constants/api');

// export umrah package duration schema
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
        days: z
            .number({
                required_error: 'Days is required',
                invalid_type_error: 'Please provide a valid days',
            })
            .positive({
                message: 'Days must be positive',
            }),
        nights: z
            .number({
                required_error: 'Nights is required',
                invalid_type_error: 'Please provide a valid nights',
            })
            .positive({
                message: 'Nights must be positive',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => UMRAH_PACKAGE_DURATION_STATUS.includes(status), {
                message: 'Please provide a valid status',
            }),
    })
    .strict();
