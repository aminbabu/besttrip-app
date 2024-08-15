/**
 * @file /schemas/zod/umrah/bookings/umrah-booking.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 31 July, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');
const {
    UMRAH_BOOKING_STATUS,
    UMRAH_BOOKING_PAYMENT_TYPE,
} = require('../../../../constants');

// export umrah booking schema
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
            }),
        id: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        umrahPackage: z
            .string({
                required_error: 'Umrah Package ID is required',
                invalid_type_error: 'Please provide a valid umrah package ID',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid umrah package ID',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => UMRAH_BOOKING_STATUS.includes(status), {
                message: 'Please provide a valid status',
            }),
        paymentType: z
            .string({
                required_error: 'Payment Type is required',
                invalid_type_error: 'Payment Type must be a string',
            })
            .refine((type) => UMRAH_BOOKING_PAYMENT_TYPE.includes(type), {
                message: 'Please provide a valid Payment Type',
            }),
    })
    .strict();
