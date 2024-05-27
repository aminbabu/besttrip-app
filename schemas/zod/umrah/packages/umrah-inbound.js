/**
 * @file /schemas/zod/umrah/packages/umrah-inbound.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');
const moment = require('moment');
const { UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS } = require('../../../../constants/api');

// export umrah inbound schema
module.exports = z
    .object({
        inboundAirlineCode: z
            .string({
                required_error: 'Inbound airline code is required',
                invalid_type_error: 'Please provide a valid inbound airline code',
            })
            .trim()
            .min(1, {
                message: 'Inbound airline code must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound airline code must be at most 255 characters',
            }),
        inboundFlightNumber: z
            .string({
                required_error: 'Inbound flight number is required',
                invalid_type_error: 'Please provide a valid inbound flight number',
            })
            .trim()
            .min(1, {
                message: 'Inbound flight number must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound flight number must be at most 255 characters',
            }),
        inboundBookingClass: z
            .string({
                required_error: 'Inbound booking class is required',
                invalid_type_error: 'Please provide a valid inbound booking class',
            })
            .trim()
            .min(1, {
                message: 'Inbound booking class must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound booking class must be at most 255 characters',
            }),
        inboundAirCraftModel: z
            .string({
                required_error: 'Inbound aircraft model is required',
                invalid_type_error: 'Please provide a valid inbound aircraft model',
            })
            .trim()
            .min(1, {
                message: 'Inbound aircraft model must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound aircraft model must be at most 255 characters',
            }),
        inboundDepartureAirport: z
            .string({
                required_error: 'Inbound departure airport is required',
                invalid_type_error: 'Please provide a valid inbound departure airport',
            })
            .trim()
            .min(1, {
                message: 'Inbound departure airport must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound departure airport must be at most 255 characters',
            }),
        inboundArrivalAirport: z
            .string({
                required_error: 'Inbound arrival airport is required',
                invalid_type_error: 'Please provide a valid inbound arrival airport',
            })
            .trim()
            .min(1, {
                message: 'Inbound arrival airport must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound arrival airport must be at most 255 characters',
            }),
        inboundDepartureDatetime: z
            .string({
                required_error: 'Inbound departure datetime is required',
                invalid_type_error: 'Please provide a valid inbound departure datetime',
            })
            .refine(
                (inboundDepartureDatetime) =>
                    moment(inboundDepartureDatetime, 'YYYY-MM-DD HH:mm', true).isValid(),
                {
                    message: 'Please provide a valid inbound departure datetime',
                }
            ),
        inboundArrivalDatetime: z
            .string({
                required_error: 'Inbound arrival datetime is required',
                invalid_type_error: 'Please provide a valid inbound arrival datetime',
            })
            .refine(
                (inboundArrivalDatetime) =>
                    moment(inboundArrivalDatetime, 'YYYY-MM-DD HH:mm', true).isValid(),
                {
                    message: 'Please provide a valid inbound arrival datetime',
                }
            ),
        inboundFlightStops: z
            .string({
                required_error: 'Inbound flight stops is required',
                invalid_type_error: 'Please provide a valid inbound flight stops',
            })
            .refine(
                (inboundFlightStops) =>
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS.includes(+inboundFlightStops),
                {
                    message: `Please provide a valid inbound flight stops. Available stops are: ${UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS.join(', ')}`,
                }
            ),
        inboundLayoverFirstDuration: z
            .string({
                required_error: 'Inbound layover first duration is required',
                invalid_type_error: 'Please provide a valid inbound layover first duration',
            })
            .refine(
                (inboundLayoverFirstDuration) =>
                    moment(inboundLayoverFirstDuration, 'HH:mm', true).isValid(),
                {
                    message: 'Please provide a valid inbound layover first duration',
                }
            )
            .optional(),
        inboundLayoverFirstAirport: z
            .string({
                required_error: 'Inbound layover first airport is required',
                invalid_type_error: 'Please provide a valid inbound layover first airport',
            })
            .trim()
            .min(1, {
                message: 'Inbound layover first airport must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound layover first airport must be at most 255 characters',
            })
            .optional(),
        inboundLayoverSecondDuration: z
            .string({
                required_error: 'Inbound layover second duration is required',
                invalid_type_error: 'Please provide a valid inbound layover second duration',
            })
            .refine(
                (inboundLayoverSecondDuration) =>
                    moment(inboundLayoverSecondDuration, 'HH:mm', true).isValid(),
                {
                    message: 'Please provide a valid inbound layover second duration',
                }
            )
            .optional(),
        inboundLayoverSecondAirport: z
            .string({
                required_error: 'Inbound layover second airport is required',
                invalid_type_error: 'Please provide a valid inbound layover second airport',
            })
            .trim()
            .min(1, {
                message: 'Inbound layover second airport must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound layover second airport must be at most 255 characters',
            })
            .optional(),
        inboundAdultBaggageCheckin: z
            .string({
                required_error: 'Inbound adult baggage checkin is required',
                invalid_type_error: 'Please provide a valid inbound adult baggage checkin',
            })
            .trim()
            .min(1, {
                message: 'Inbound adult baggage checkin must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound adult baggage checkin must be at most 255 characters',
            }),
        inboundChildBaggageCheckin: z
            .string({
                required_error: 'Inbound child baggage checkin is required',
                invalid_type_error: 'Please provide a valid inbound child baggage checkin',
            })
            .trim()
            .min(1, {
                message: 'Inbound child baggage checkin must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound child baggage checkin must be at most 255 characters',
            }),
        inboundInfantBaggageCheckin: z
            .string({
                required_error: 'Inbound infant baggage checkin is required',
                invalid_type_error: 'Please provide a valid inbound infant baggage checkin',
            })
            .trim()
            .min(1, {
                message: 'Inbound infant baggage checkin must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound infant baggage checkin must be at most 255 characters',
            }),
        inboundAdultBaggageCabin: z
            .string({
                required_error: 'Inbound adult baggage cabin is required',
                invalid_type_error: 'Please provide a valid inbound adult baggage cabin',
            })
            .trim()
            .min(1, {
                message: 'Inbound adult baggage cabin must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound adult baggage cabin must be at most 255 characters',
            }),
        inboundChildBaggageCabin: z
            .string({
                required_error: 'Inbound child baggage cabin is required',
                invalid_type_error: 'Please provide a valid inbound child baggage cabin',
            })
            .trim()
            .min(1, {
                message: 'Inbound child baggage cabin must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound child baggage cabin must be at most 255 characters',
            }),
        inboundInfantBaggageCabin: z
            .string({
                required_error: 'Inbound infant baggage cabin is required',
                invalid_type_error: 'Please provide a valid inbound infant baggage cabin',
            })
            .trim()
            .min(1, {
                message: 'Inbound infant baggage cabin must be at least 1 characters',
            })
            .max(255, {
                message: 'Inbound infant baggage cabin must be at most 255 characters',
            }),
    })
    .strict();
