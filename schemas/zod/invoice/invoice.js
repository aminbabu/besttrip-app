/**
 * @file /schemas/zod/invoice.invoice.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');

// export payment settings schema
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
        partialPaymentExpiryDate: z
            .string({
                required_error: 'Partial payment time limit is required',
                invalid_type_error: 'Please provide a valid date',
            })
            .refine((date) => !isNaN(Date.parse(date)), {
                message: 'Please provide a valid date',
            }),
    })
    .strict();
