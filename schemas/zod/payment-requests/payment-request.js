/**
 * @file /schemas/zod/payment-requests/payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');
const moment = require('moment');
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
        amount: z
            .string({
                required_error: 'Amount is required',
                invalid_type_error: 'Amount should be a string',
            })
            .refine((amount) => Number(amount) > 0, {
                message: 'Amount should be a positive number',
            }),
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
        paymentDate: z
            .string({
                required_error: 'Payment date is required',
                invalid_type_error: 'Payment date should be a string',
            })
            .refine((date) => moment(date, 'YYYY-MM-DD', true).isValid(), {
                message: 'Please enter a valid payment date',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Status should be a string',
            })
            .refine((status) => PAYMENT_REQUEST_STATUS.includes(status), {
                message: `Status should be one of ${PAYMENT_REQUEST_STATUS.join(', ')}`,
            })
            .optional(),
        note: z
            .string({
                required_error: 'Note is required',
                invalid_type_error: 'Note should be a string',
            })
            .min(10, 'Note should be at least 10 characters long')
            .max(500, 'Note should not be more than 500 characters long')
            .optional(),
    })
    .strict();
