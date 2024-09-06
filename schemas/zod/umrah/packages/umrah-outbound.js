/**
 * @file /schemas/zod/umrah/packages/umrah-outbound.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');
const moment = require('moment');
const {
    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
} = require('../../../../constants');

// export umrah outbound schema
module.exports = z
    .object({
        outboundAirlineCode: z
            .string({
                required_error: 'Outbound airline code is required',
                invalid_type_error:
                    'Please provide a valid outbound airline code',
            })
            .trim()
            .min(1, {
                message: 'Outbound airline code must be at least 1 characters',
            })
            .max(255, {
                message: 'Outbound airline code must be at most 255 characters',
            }),
        outboundFlightNumber: z
            .string({
                required_error: 'Outbound flight number is required',
                invalid_type_error:
                    'Please provide a valid outbound flight number',
            })
            .trim()
            .min(1, {
                message: 'Outbound flight number must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound flight number must be at most 255 characters',
            }),
        outboundBookingClass: z
            .string({
                required_error: 'Outbound booking class is required',
                invalid_type_error:
                    'Please provide a valid outbound booking class',
            })
            .trim()
            .min(1, {
                message: 'Outbound booking class must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound booking class must be at most 255 characters',
            }),
        outboundAirCraftModel: z
            .string({
                required_error: 'Outbound aircraft model is required',
                invalid_type_error:
                    'Please provide a valid outbound aircraft model',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound aircraft model must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound aircraft model must be at most 255 characters',
            }),
        outboundDepartureAirport: z
            .string({
                required_error: 'Outbound departure airport is required',
                invalid_type_error:
                    'Please provide a valid outbound departure airport',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound departure airport must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound departure airport must be at most 255 characters',
            }),
        outboundArrivalAirport: z
            .string({
                required_error: 'Outbound arrival airport is required',
                invalid_type_error:
                    'Please provide a valid outbound arrival airport',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound arrival airport must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound arrival airport must be at most 255 characters',
            }),
        outboundDepartureDatetime: z
            .string({
                required_error: 'Outbound departure datetime is required',
                invalid_type_error:
                    'Please provide a valid outbound departure datetime',
            })
            .refine(
                (outboundDepartureDatetime) =>
                    moment(
                        outboundDepartureDatetime,
                        'YYYY-MM-DD HH:mm',
                        true
                    ).isValid(),
                {
                    message:
                        'Please provide a valid outbound departure datetime',
                }
            ),
        outboundArrivalDatetime: z
            .string({
                required_error: 'Outbound arrival datetime is required',
                invalid_type_error:
                    'Please provide a valid outbound arrival datetime',
            })
            .refine(
                (outboundArrivalDatetime) =>
                    moment(
                        outboundArrivalDatetime,
                        'YYYY-MM-DD HH:mm',
                        true
                    ).isValid(),
                {
                    message: 'Please provide a valid outbound arrival datetime',
                }
            ),
        outboundFlightStops: z
            .string({
                required_error: 'Outbound flight stops is required',
                invalid_type_error:
                    'Please provide a valid outbound flight stops',
            })
            .refine(
                (outboundFlightStops) =>
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS.includes(
                        +outboundFlightStops
                    ),
                {
                    message: `Please provide a valid outbound flight stops. Available stops are: ${UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS.join(
                        ', '
                    )}`,
                }
            ),
        outboundLayoverFirstDuration: z
            .string({
                required_error: 'Outbound layover first duration is required',
                invalid_type_error:
                    'Please provide a valid outbound layover first duration',
            })
            .refine(
                (outboundLayoverFirstDuration) =>
                    moment(
                        outboundLayoverFirstDuration,
                        'HH:mm',
                        true
                    ).isValid(),
                {
                    message:
                        'Please provide a valid outbound layover first duration',
                }
            )
            .optional(),
        outboundLayoverFirstAirport: z
            .string({
                required_error: 'Outbound layover first airport is required',
                invalid_type_error:
                    'Please provide a valid outbound layover first airport',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound layover first airport must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound layover first airport must be at most 255 characters',
            })
            .optional(),
        outboundLayoverSecondDuration: z
            .string({
                required_error: 'Outbound layover second duration is required',
                invalid_type_error:
                    'Please provide a valid outbound layover second duration',
            })
            .refine(
                (outboundLayoverSecondDuration) =>
                    moment(
                        outboundLayoverSecondDuration,
                        'HH:mm',
                        true
                    ).isValid(),
                {
                    message:
                        'Please provide a valid outbound layover second duration',
                }
            )
            .optional(),
        outboundLayoverSecondAirport: z
            .string({
                required_error: 'Outbound layover second airport is required',
                invalid_type_error:
                    'Please provide a valid outbound layover second airport',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound layover second airport must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound layover second airport must be at most 255 characters',
            })
            .optional(),
        outboundAdultBaggageCheckin: z
            .string({
                required_error: 'Outbound adult baggage checkin is required',
                invalid_type_error:
                    'Please provide a valid outbound adult baggage checkin',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound adult baggage checkin must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound adult baggage checkin must be at most 255 characters',
            }),
        outboundChildBaggageCheckin: z
            .string({
                required_error: 'Outbound child baggage checkin is required',
                invalid_type_error:
                    'Please provide a valid outbound child baggage checkin',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound child baggage checkin must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound child baggage checkin must be at most 255 characters',
            }),
        outboundInfantBaggageCheckin: z
            .string({
                required_error: 'Outbound infant baggage checkin is required',
                invalid_type_error:
                    'Please provide a valid outbound infant baggage checkin',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound infant baggage checkin must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound infant baggage checkin must be at most 255 characters',
            }),
        outboundAdultBaggageCabin: z
            .string({
                required_error: 'Outbound adult baggage cabin is required',
                invalid_type_error:
                    'Please provide a valid outbound adult baggage cabin',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound adult baggage cabin must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound adult baggage cabin must be at most 255 characters',
            }),
        outboundChildBaggageCabin: z
            .string({
                required_error: 'Outbound child baggage cabin is required',
                invalid_type_error:
                    'Please provide a valid outbound child baggage cabin',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound child baggage cabin must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound child baggage cabin must be at most 255 characters',
            }),
        outboundInfantBaggageCabin: z
            .string({
                required_error: 'Outbound infant baggage cabin is required',
                invalid_type_error:
                    'Please provide a valid outbound infant baggage cabin',
            })
            .trim()
            .min(1, {
                message:
                    'Outbound infant baggage cabin must be at least 1 characters',
            })
            .max(255, {
                message:
                    'Outbound infant baggage cabin must be at most 255 characters',
            }),
    })
    .strict();
