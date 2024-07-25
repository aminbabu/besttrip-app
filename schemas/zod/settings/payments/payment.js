/**
 * @file /schemas/zod/settings/payments/payment.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');
const { PAYMENTS_STATUS } = require('../../../../constants');

// export payment settings schema
module.exports = z
    .object({
        ids: z
            .array(
                z.string({
                    required_error: 'IDs are required',
                    invalid_type_error: 'Please provide valid IDs',
                })
            )
            .nonempty({
                message: 'IDs array must not be empty',
            })
            .optional(),
        id: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        accountHolderName: z
            .string({
                required_error: 'Account holder is required',
                invalid_type_error: 'Account holder should be a string',
            })
            .min(3, {
                message: 'Account holder should be at least 3 characters long',
            }),
        accountNumber: z
            .string({
                required_error: 'Account number is required',
                invalid_type_error: 'Account number should be a string',
            })
            .min(10, {
                message: 'Account number should be at least 10 characters long',
            }),
        bankName: z
            .string({
                required_error: 'Bank name is required',
                invalid_type_error: 'Bank name should be a string',
            })
            .min(3, {
                message: 'Bank name should be at least 3 characters long',
            }),
        branchName: z
            .string({
                required_error: 'Branch name is required',
                invalid_type_error: 'Branch name should be a string',
            })
            .min(3, {
                message: 'Branch name should be at least 3 characters long',
            }),
        routingNumber: z
            .string({
                required_error: 'Routing number is required',
                invalid_type_error: 'Routing number should be a string',
            })
            .min(3, {
                message: 'Routing number should be at least 3 characters long',
            }),
        swiftCode: z
            .string({
                required_error: 'Swift code is required',
                invalid_type_error: 'Swift code should be a string',
            })
            .min(3, {
                message: 'Swift code should be at least 3 characters long',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Status should be a string',
            })
            .default('active')
            .refine((status) => PAYMENTS_STATUS.includes(status), {
                message: 'Invalid status value',
            }),
    })
    .strict();
