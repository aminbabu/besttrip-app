/**
 * @file /schemas/zod/payment-requests/payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');
const { PAYMENT_REQUEST_STATUS } = require('../../../constants');

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
        title: z
            .string({
                required_error: 'Title is required',
                invalid_type_error: 'Title should be a string',
            })
            .min(3, 'Title should be at least 3 characters long')
            .max(255, 'Title should not be more than 255 characters long'),
        amount: z
            .number({
                required_error: 'Amount is required',
                invalid_type_error: 'Amount should be a number',
            })
            .min(0, 'Amount should be a positive number'),
        account: z
            .string({
                required_error: 'Account is required',
                invalid_type_error: 'Account should be a string',
            })
            .min(10, 'Account should be at least 3 characters long')
            .max(50, 'Account should not be more than 50 characters long'),
        paymentMethod: z
            .string({
                required_error: 'Payment method is required',
                invalid_type_error: 'Payment method should be a string',
            })
            .min(3, 'Payment method should be at least 3 characters long')
            .max(50, 'Payment method should not be more than 50 characters long'),
        paymentType: z
            .string({
                required_error: 'Payment type is required',
                invalid_type_error: 'Payment type should be a string',
            })
            .min(3, 'Payment type should be at least 3 characters long')
            .max(50, 'Payment type should not be more than 50 characters long'),
        paymentDate: z.date({
            required_error: 'Payment date is required',
            invalid_type_error: 'Payment date should be a date',
        }),
        attachment: z
            .string({
                invalid_type_error: 'Attachment should be a string',
            })
            .optional(),
        remarks: z
            .string({
                invalid_type_error: 'Remarks should be a string',
            })
            .optional(),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Status should be a string',
            })
            .default('active')
            .refine((status) => PAYMENT_REQUEST_STATUS.includes(status), {
                message: 'Invalid status value',
            }),
        customer: z
            .string({
                required_error: 'Customer is required',
                invalid_type_error: 'Customer should be a string',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid customer id',
            }),
    })
    .strict();
