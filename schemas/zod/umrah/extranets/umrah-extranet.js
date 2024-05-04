/**
 * @file /schemas/zod/umdah/extranets/umrah-extranet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 04 May, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');
const {
    UMDAH_EXTRANET_STATUS,
    UMDAH_EXTRANET_INCLUSIONS,
    UMDAH_EXTRANET_TYPES,
    UMDAH_EXTRANET_OUTBOUND_FLIGHT_STOPS,
} = require('../../../../constants');

// export umdah extranet schema
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
        thumbnail: z.string({
            required_error: 'Thumbnail is required',
            invalid_type_error: 'Please provide a valid thumbnail',
        }),
        title: z
            .string({
                required_error: 'Title is required',
                invalid_type_error: 'Please provide a valid title',
            })
            .trim()
            .min(3, {
                message: 'Title must be at least 3 characters',
            }),
        subtitle: z
            .string({
                required_error: 'Subtitle is required',
                invalid_type_error: 'Please provide a valid subtitle',
            })
            .trim()
            .min(3, {
                message: 'Subtitle must be at least 3 characters',
            })
            .max(255, {
                message: 'Subtitle must be at most 255 characters',
            }),
        departureLocation: z
            .string({
                required_error: 'Departure location is required',
                invalid_type_error: 'Please provide a valid departure location',
            })
            .trim()
            .min(3, {
                message: 'Departure location must be at least 3 characters',
            })
            .max(255, {
                message: 'Departure location must be at most 255 characters',
            }),
        schedule: z
            .string({
                required_error: 'Schedule is required',
                invalid_type_error: 'Please provide a valid schedule',
            })
            .trim()
            .min(3, {
                message: 'Schedule must be at least 3 characters',
            })
            .max(255, {
                message: 'Schedule must be at most 255 characters',
            }),
        journeyDate: z.date({
            required_error: 'Journey date is required',
            invalid_type_error: 'Please provide a valid journey date',
        }),
        expiryDate: z.date({
            required_error: 'Expiry date is required',
            invalid_type_error: 'Please provide a valid expiry date',
        }),
        type: z
            .string({
                required_error: 'Type is required',
                invalid_type_error: 'Please provide a valid type',
            })
            .refine((type) => UMDAH_EXTRANET_TYPES.includes(type), {
                message: 'Please provide a valid type',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => UMDAH_EXTRANET_STATUS.includes(status), {
                message: 'Please provide a valid status',
            }),
        adultPrice: z.number({
            required_error: 'Adult price is required',
            invalid_type_error: 'Please provide a valid adult price',
        }),
        adultPartialPrice: z
            .number({
                required_error: 'Adult partial price is required',
                invalid_type_error: 'Please provide a valid adult partial price',
            })
            .optional(),
        childPrice: z.number({
            required_error: 'Child price is required',
            invalid_type_error: 'Please provide a valid child price',
        }),
        childPartialPrice: z
            .number({
                required_error: 'Child partial price is required',
                invalid_type_error: 'Please provide a valid child partial price',
            })
            .optional(),
        infantPrice: z.number({
            required_error: 'Infant price is required',
            invalid_type_error: 'Please provide a valid infant price',
        }),
        infantPartialPrice: z
            .number({
                required_error: 'Infant partial price is required',
                invalid_type_error: 'Please provide a valid infant partial price',
            })
            .optional(),
        seats: z.number({
            required_error: 'Seats is required',
            invalid_type_error: 'Please provide a valid seats',
        }),
        inclusions: z
            .array(
                z
                    .string({
                        required_error: 'Inclusion is required',
                        invalid_type_error: 'Please provide a valid inclusion',
                    })
                    .refine((inclusion) => UMDAH_EXTRANET_INCLUSIONS.includes(inclusion), {
                        message: 'Please provide a valid inclusion',
                    })
            )
            .nonempty({
                message: 'At least one inclusion is required',
            }),
        extraThumbnails: z
            .array(
                z.string({
                    required_error: 'Extra thumbnail is required',
                    invalid_type_error: 'Please provide a valid extra thumbnail',
                })
            )
            .nonempty({
                message: 'At least one extra thumbnail is required',
            })
            .optional(),
        outboundAirlineCode: z
            .string({
                required_error: 'Outbound airline code is required',
                invalid_type_error: 'Please provide a valid outbound airline code',
            })
            .trim()
            .min(3, {
                message: 'Outbound airline code must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound airline code must be at most 255 characters',
            }),
        outboundFlightNumber: z
            .string({
                required_error: 'Outbound flight number is required',
                invalid_type_error: 'Please provide a valid outbound flight number',
            })
            .trim()
            .min(3, {
                message: 'Outbound flight number must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound flight number must be at most 255 characters',
            }),
        outboundBookingClass: z
            .string({
                required_error: 'Outbound booking class is required',
                invalid_type_error: 'Please provide a valid outbound booking class',
            })
            .trim()
            .min(3, {
                message: 'Outbound booking class must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound booking class must be at most 255 characters',
            }),
        outboundAirCraftModel: z
            .string({
                required_error: 'Outbound aircraft model is required',
                invalid_type_error: 'Please provide a valid outbound aircraft model',
            })
            .trim()
            .min(3, {
                message: 'Outbound aircraft model must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound aircraft model must be at most 255 characters',
            }),
        outboundDepartureAirport: z
            .string({
                required_error: 'Outbound departure airport is required',
                invalid_type_error: 'Please provide a valid outbound departure airport',
            })
            .trim()
            .min(3, {
                message: 'Outbound departure airport must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound departure airport must be at most 255 characters',
            }),
        outboundArrivalAirport: z
            .string({
                required_error: 'Outbound arrival airport is required',
                invalid_type_error: 'Please provide a valid outbound arrival airport',
            })
            .trim()
            .min(3, {
                message: 'Outbound arrival airport must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound arrival airport must be at most 255 characters',
            }),
        outboundDepartureDatetime: z.date({
            required_error: 'Outbound departure datetime is required',
            invalid_type_error: 'Please provide a valid outbound departure datetime',
        }),
        outboundArrivalDatetime: z.date({
            required_error: 'Outbound arrival datetime is required',
            invalid_type_error: 'Please provide a valid outbound arrival datetime',
        }),
        outboundFlightStops: z
            .number({
                required_error: 'Outbound flight stops is required',
                invalid_type_error: 'Please provide a valid outbound flight stops',
            })
            .refine(
                (outboundFlightStops) =>
                    UMDAH_EXTRANET_OUTBOUND_FLIGHT_STOPS.includes(outboundFlightStops),
                {
                    message: 'Please provide a valid outbound flight stops',
                }
            ),
        outboundLayoverFirstDuration: z
            .string({
                required_error: 'Outbound layover first duration is required',
                invalid_type_error: 'Please provide a valid outbound layover first duration',
            })
            .trim()
            .min(3, {
                message: 'Outbound layover first duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound layover first duration must be at most 255 characters',
            })
            .optional(),
        outboundLayoverFirstAirport: z
            .string({
                required_error: 'Outbound layover first airport is required',
                invalid_type_error: 'Please provide a valid outbound layover first airport',
            })
            .trim()
            .min(3, {
                message: 'Outbound layover first airport must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound layover first airport must be at most 255 characters',
            })
            .optional(),
        outboundLayoverSecondDuration: z
            .string({
                required_error: 'Outbound layover second duration is required',
                invalid_type_error: 'Please provide a valid outbound layover second duration',
            })
            .trim()
            .min(3, {
                message: 'Outbound layover second duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound layover second duration must be at most 255 characters',
            })
            .optional(),
        outboundLayoverSecondAirport: z
            .string({
                required_error: 'Outbound layover second airport is required',
                invalid_type_error: 'Please provide a valid outbound layover second airport',
            })
            .trim()
            .min(3, {
                message: 'Outbound layover second airport must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound layover second airport must be at most 255 characters',
            })
            .optional(),
        outboundAdultBaggageCheckin: z
            .string({
                required_error: 'Outbound adult baggage checkin is required',
                invalid_type_error: 'Please provide a valid outbound adult baggage checkin',
            })
            .trim()
            .min(3, {
                message: 'Outbound adult baggage checkin must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound adult baggage checkin must be at most 255 characters',
            }),
        outboundChildBaggageCheckin: z
            .string({
                required_error: 'Outbound child baggage checkin is required',
                invalid_type_error: 'Please provide a valid outbound child baggage checkin',
            })
            .trim()
            .min(3, {
                message: 'Outbound child baggage checkin must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound child baggage checkin must be at most 255 characters',
            }),
        outboundInfantBaggageCheckin: z
            .string({
                required_error: 'Outbound infant baggage checkin is required',
                invalid_type_error: 'Please provide a valid outbound infant baggage checkin',
            })
            .trim()
            .min(3, {
                message: 'Outbound infant baggage checkin must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound infant baggage checkin must be at most 255 characters',
            }),
        outboundAdultBaggageCabin: z
            .string({
                required_error: 'Outbound adult baggage cabin is required',
                invalid_type_error: 'Please provide a valid outbound adult baggage cabin',
            })
            .trim()
            .min(3, {
                message: 'Outbound adult baggage cabin must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound adult baggage cabin must be at most 255 characters',
            }),
        outboundChildBaggageCabin: z
            .string({
                required_error: 'Outbound child baggage cabin is required',
                invalid_type_error: 'Please provide a valid outbound child baggage cabin',
            })
            .trim()
            .min(3, {
                message: 'Outbound child baggage cabin must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound child baggage cabin must be at most 255 characters',
            }),
        outboundInfantBaggageCabin: z
            .string({
                required_error: 'Outbound infant baggage cabin is required',
                invalid_type_error: 'Please provide a valid outbound infant baggage cabin',
            })
            .trim()
            .min(3, {
                message: 'Outbound infant baggage cabin must be at least 3 characters',
            })
            .max(255, {
                message: 'Outbound infant baggage cabin must be at most 255 characters',
            }),
        makkahHotelThumbnail: z.string({
            required_error: 'Makka hotel thumbnail is required',
            invalid_type_error: 'Please provide a valid makka hotel thumbnail',
        }),
        makkahHotelNoOfNights: z.number({
            required_error: 'Makka hotel no of nights is required',
            invalid_type_error: 'Please provide a valid no. of nights in Makka hotel',
        }),
        makkahHotelName: z
            .string({
                required_error: 'Makka hotel name is required',
                invalid_type_error: 'Please provide a valid makka hotel name',
            })
            .trim()
            .min(3, {
                message: 'Makka hotel name must be at least 3 characters',
            })
            .max(255, {
                message: 'Makka hotel name must be at most 255 characters',
            }),
        makkahHotelAddress: z
            .string({
                required_error: 'Makka hotel address is required',
                invalid_type_error: 'Please provide a valid makka hotel address',
            })
            .trim()
            .min(3, {
                message: 'Makka hotel address must be at least 3 characters',
            })
            .max(255, {
                message: 'Makka hotel address must be at most 255 characters',
            }),
        makkahHotelRating: z.number({
            required_error: 'Makka hotel rating is required',
            invalid_type_error: 'Please provide a valid makka hotel rating',
        }),
        makkahHotelDistance: z
            .string({
                required_error: 'Makka hotel distance is required',
                invalid_type_error: 'Please provide a valid makka hotel distance',
            })
            .trim()
            .min(3, {
                message: 'Makka hotel distance must be at least 3 characters',
            })
            .max(255, {
                message: 'Makka hotel distance must be at most 255 characters',
            }),
        makkahHotelWalkDuration: z
            .string({
                required_error: 'Makka hotel walk duration is required',
                invalid_type_error: 'Please provide a valid makka hotel walk duration',
            })
            .trim()
            .min(3, {
                message: 'Makka hotel walk duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Makka hotel walk duration must be at most 255 characters',
            }),
        makkahHotelLocation: z
            .string({
                required_error: 'Makka hotel location is required',
                invalid_type_error: 'Please provide a valid makka hotel location',
            })
            .trim()
            .min(3, {
                message: 'Makka hotel location must be at least 3 characters',
            })
            .max(255, {
                message: 'Makka hotel location must be at most 255 characters',
            }),
        makkahHotelNote: z
            .string({
                required_error: 'Makka hotel note is required',
                invalid_type_error: 'Please provide a valid makka hotel note',
            })
            .trim()
            .min(3, {
                message: 'Makka hotel note must be at least 3 characters',
            })
            .max(255, {
                message: 'Makka hotel note must be at most 255 characters',
            }),
        makkahHotelExtraThumbnails: z
            .array(
                z.string({
                    required_error: 'Makka hotel extra thumbnail is required',
                    invalid_type_error: 'Please provide a valid makka hotel extra thumbnail',
                })
            )
            .nonempty({
                message: 'At least one makka hotel extra thumbnail is required',
            })
            .optional(),
        madinahHotelThumbnail: z.string({
            required_error: 'Madina hotel thumbnail is required',
            invalid_type_error: 'Please provide a valid madina hotel thumbnail',
        }),
        madinahHotelNoOfNights: z.number({
            required_error: 'Madina hotel no of nights is required',
            invalid_type_error: 'Please provide a valid no. of nights in Madina hotel',
        }),
        madinahHotelName: z
            .string({
                required_error: 'Madina hotel name is required',
                invalid_type_error: 'Please provide a valid madina hotel name',
            })
            .trim()
            .min(3, {
                message: 'Madina hotel name must be at least 3 characters',
            })
            .max(255, {
                message: 'Madina hotel name must be at most 255 characters',
            }),
        madinahHotelAddress: z
            .string({
                required_error: 'Madina hotel address is required',
                invalid_type_error: 'Please provide a valid madina hotel address',
            })
            .trim()
            .min(3, {
                message: 'Madina hotel address must be at least 3 characters',
            })
            .max(255, {
                message: 'Madina hotel address must be at most 255 characters',
            }),
        madinahHotelRating: z.number({
            required_error: 'Madina hotel rating is required',
            invalid_type_error: 'Please provide a valid madina hotel rating',
        }),
        madinahHotelDistance: z
            .string({
                required_error: 'Madina hotel distance is required',
                invalid_type_error: 'Please provide a valid madina hotel distance',
            })
            .trim()
            .min(3, {
                message: 'Madina hotel distance must be at least 3 characters',
            })
            .max(255, {
                message: 'Madina hotel distance must be at most 255 characters',
            }),
        madinahHotelWalkDuration: z
            .string({
                required_error: 'Madina hotel walk duration is required',
                invalid_type_error: 'Please provide a valid madina hotel walk duration',
            })
            .trim()
            .min(3, {
                message: 'Madina hotel walk duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Madina hotel walk duration must be at most 255 characters',
            }),
        madinahHotelLocation: z
            .string({
                required_error: 'Madina hotel location is required',
                invalid_type_error: 'Please provide a valid madina hotel location',
            })
            .trim()
            .min(3, {
                message: 'Madina hotel location must be at least 3 characters',
            })
            .max(255, {
                message: 'Madina hotel location must be at most 255 characters',
            }),
        madinahHotelNote: z
            .string({
                required_error: 'Madina hotel note is required',
                invalid_type_error: 'Please provide a valid madina hotel note',
            })
            .trim()
            .min(3, {
                message: 'Madina hotel note must be at least 3 characters',
            })
            .max(255, {
                message: 'Madina hotel note must be at most 255 characters',
            }),
        madinahHotelExtraThumbnails: z
            .array(
                z.string({
                    required_error: 'Madina hotel extra thumbnail is required',
                    invalid_type_error: 'Please provide a valid madina hotel extra thumbnail',
                })
            )
            .nonempty({
                message: 'At least one madina hotel extra thumbnail is required',
            })
            .optional(),
        inboundAirlineCode: z
            .string({
                required_error: 'Inbound airline code is required',
                invalid_type_error: 'Please provide a valid inbound airline code',
            })
            .trim()
            .min(3, {
                message: 'Inbound airline code must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound flight number must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound booking class must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound aircraft model must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound departure airport must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound arrival airport must be at least 3 characters',
            })
            .max(255, {
                message: 'Inbound arrival airport must be at most 255 characters',
            }),
        inboundDepartureDatetime: z.date({
            required_error: 'Inbound departure datetime is required',
            invalid_type_error: 'Please provide a valid inbound departure datetime',
        }),
        inboundArrivalDatetime: z.date({
            required_error: 'Inbound arrival datetime is required',
            invalid_type_error: 'Please provide a valid inbound arrival datetime',
        }),
        inboundFlightStops: z.number({
            required_error: 'Inbound flight stops is required',
            invalid_type_error: 'Please provide a valid inbound flight stops',
        }),
        inboundLayoverFirstDuration: z
            .string({
                required_error: 'Inbound layover first duration is required',
                invalid_type_error: 'Please provide a valid inbound layover first duration',
            })
            .trim()
            .min(3, {
                message: 'Inbound layover first duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Inbound layover first duration must be at most 255 characters',
            })
            .optional(),
        inboundLayoverFirstAirport: z
            .string({
                required_error: 'Inbound layover first airport is required',
                invalid_type_error: 'Please provide a valid inbound layover first airport',
            })
            .trim()
            .min(3, {
                message: 'Inbound layover first airport must be at least 3 characters',
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
            .trim()
            .min(3, {
                message: 'Inbound layover second duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Inbound layover second duration must be at most 255 characters',
            })
            .optional(),
        inboundLayoverSecondAirport: z
            .string({
                required_error: 'Inbound layover second airport is required',
                invalid_type_error: 'Please provide a valid inbound layover second airport',
            })
            .trim()
            .min(3, {
                message: 'Inbound layover second airport must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound adult baggage checkin must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound child baggage checkin must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound infant baggage checkin must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound adult baggage cabin must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound child baggage cabin must be at least 3 characters',
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
            .min(3, {
                message: 'Inbound infant baggage cabin must be at least 3 characters',
            })
            .max(255, {
                message: 'Inbound infant baggage cabin must be at most 255 characters',
            }),
        visaType: z
            .string({
                required_error: 'Visa type is required',
                invalid_type_error: 'Please provide a valid visa type',
            })
            .trim()
            .min(3, {
                message: 'Visa type must be at least 3 characters',
            })
            .max(255, {
                message: 'Visa type must be at most 255 characters',
            }),
        visaNoOfEntries: z.number({
            required_error: 'Visa no of entries is required',
            invalid_type_error: 'Please provide a valid visa no of entries',
        }),
        visaDuration: z
            .string({
                required_error: 'Visa duration is required',
                invalid_type_error: 'Please provide a valid visa duration',
            })
            .trim()
            .min(3, {
                message: 'Visa duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Visa duration must be at most 255 characters',
            }),
        visaValidity: z
            .string({
                required_error: 'Visa validity is required',
                invalid_type_error: 'Please provide a valid visa validity',
            })
            .trim()
            .min(3, {
                message: 'Visa validity must be at least 3 characters',
            })
            .max(255, {
                message: 'Visa validity must be at most 255 characters',
            }),
        visaOptions: z.array(
            z
                .string({
                    required_error: 'Visa option is required',
                    invalid_type_error: 'Please provide a valid visa option',
                })
                .trim()
                .min(3, {
                    message: 'Visa option must be at least 3 characters',
                })
                .max(255, {
                    message: 'Visa option must be at most 255 characters',
                })
        ),
        visaNote: z
            .string({
                required_error: 'Visa note is required',
                invalid_type_error: 'Please provide a valid visa note',
            })
            .trim()
            .min(3, {
                message: 'Visa note must be at least 3 characters',
            })
            .max(255, {
                message: 'Visa note must be at most 255 characters',
            })
            .optional(),
        transportType: z
            .string({
                required_error: 'Transport type is required',
                invalid_type_error: 'Please provide a valid transport type',
            })
            .trim()
            .min(3, {
                message: 'Transport type must be at least 3 characters',
            })
            .max(255, {
                message: 'Transport type must be at most 255 characters',
            }),
        transportAirportToHotel: z
            .string({
                required_error: 'Transport airport to hotel is required',
                invalid_type_error: 'Please provide a valid transport airport to hotel',
            })
            .trim()
            .min(3, {
                message: 'Transport airport to hotel must be at least 3 characters',
            })
            .max(255, {
                message: 'Transport airport to hotel must be at most 255 characters',
            }),
        transportVisitorPlaces: z.boolean({
            required_error: 'Transport visitor places is required',
            invalid_type_error: 'Please provide a valid transport visitor places',
        }),
        transportServices: z.array(
            z
                .string({
                    required_error: 'Transport service is required',
                    invalid_type_error: 'Please provide a valid transport service',
                })
                .trim()
                .min(3, {
                    message: 'Transport service must be at least 3 characters',
                })
        ),
        transportServiceTypes: z.array(
            z
                .string({
                    required_error: 'Transport service type is required',
                    invalid_type_error: 'Please provide a valid transport service type',
                })
                .trim()
                .min(3, {
                    message: 'Transport service type must be at least 3 characters',
                })
                .max(255, {
                    message: 'Transport service type must be at most 255 characters',
                })
        ),
        transportNote: z
            .string({
                required_error: 'Transport note is required',
                invalid_type_error: 'Please provide a valid transport note',
            })
            .trim()
            .min(3, {
                message: 'Transport note must be at least 3 characters',
            })
            .max(255, {
                message: 'Transport note must be at most 255 characters',
            })
            .optional(),
        ziyaraDays: z.number({
            required_error: 'Ziyara days is required',
            invalid_type_error: 'Please provide a valid ziyara days',
        }),
        ziyaraMakka: z.boolean({
            required_error: 'Ziyara Makka is required',
            invalid_type_error: 'Please provide a valid ziyara Makka',
        }),
        ziyaraMadina: z.boolean({
            required_error: 'Ziyara Madina is required',
            invalid_type_error: 'Please provide a valid ziyara Madina',
        }),
        ziyaraTaif: z.boolean({
            required_error: 'Ziyara Taif is required',
            invalid_type_error: 'Please provide a valid ziyara Taif',
        }),
        ziyaraMakkaDetails: z.array(
            z
                .string({
                    required_error: 'Ziyara Makka detail is required',
                    invalid_type_error: 'Please provide a valid ziyara Makka detail',
                })
                .trim()
                .min(3, {
                    message: 'Ziyara Makka detail must be at least 3 characters',
                })
                .max(255, {
                    message: 'Ziyara Makka detail must be at most 255 characters',
                })
        ),
        ziyaraMadinaDetails: z.array(
            z
                .string({
                    required_error: 'Ziyara Madina detail is required',
                    invalid_type_error: 'Please provide a valid ziyara Madina detail',
                })
                .trim()
                .min(3, {
                    message: 'Ziyara Madina detail must be at least 3 characters',
                })
                .max(255, {
                    message: 'Ziyara Madina detail must be at most 255 characters',
                })
        ),
        ziyaraTaifDetails: z.array(
            z
                .string({
                    required_error: 'Ziyara Taif detail is required',
                    invalid_type_error: 'Please provide a valid ziyara Taif detail',
                })
                .trim()
                .min(3, {
                    message: 'Ziyara Taif detail must be at least 3 characters',
                })
                .max(255, {
                    message: 'Ziyara Taif detail must be at most 255 characters',
                })
        ),
        ziyaraNote: z
            .string({
                required_error: 'Ziyara note is required',
                invalid_type_error: 'Please provide a valid ziyara note',
            })
            .trim()
            .min(3, {
                message: 'Ziyara note must be at least 3 characters',
            })
            .max(255, {
                message: 'Ziyara note must be at most 255 characters',
            })
            .optional(),
        itineraryDays: z
            .array(
                z.object({
                    thumbnail: z
                        .string({
                            required_error: 'Itinerary day thumbnail is required',
                            invalid_type_error: 'Please provide a valid itinerary day thumbnail',
                        })
                        .optional(),
                    title: z
                        .string({
                            required_error: 'Itinerary day title is required',
                            invalid_type_error: 'Please provide a valid itinerary day title',
                        })
                        .trim()
                        .min(3, {
                            message: 'Itinerary day title must be at least 3 characters',
                        })
                        .max(255, {
                            message: 'Itinerary day title must be at most 255 characters',
                        })
                        .optional(),
                    description: z
                        .string({
                            required_error: 'Itinerary day description is required',
                            invalid_type_error: 'Please provide a valid itinerary day description',
                        })
                        .trim()
                        .min(3, {
                            message: 'Itinerary day description must be at least 3 characters',
                        })
                        .max(255, {
                            message: 'Itinerary day description must be at most 255 characters',
                        })
                        .optional(),
                })
            )
            .optional(),
        umrahThumbnail: z.string({
            required_error: 'Umrah thumbnail is required',
            invalid_type_error: 'Please provide a valid umrah thumbnail',
        }),
        umrahTitle: z
            .string({
                required_error: 'Umrah title is required',
                invalid_type_error: 'Please provide a valid umrah title',
            })
            .trim()
            .min(3, {
                message: 'Umrah title must be at least 3 characters',
            })
            .max(255, {
                message: 'Umrah title must be at most 255 characters',
            }),
        umrahExerpt: z
            .string({
                required_error: 'Umrah exerpt is required',
                invalid_type_error: 'Please provide a valid umrah exerpt',
            })
            .trim()
            .min(3, {
                message: 'Umrah exerpt must be at least 3 characters',
            })
            .max(255, {
                message: 'Umrah exerpt must be at most 255 characters',
            }),
        umrahDescription: z
            .string({
                required_error: 'Umrah description is required',
                invalid_type_error: 'Please provide a valid umrah description',
            })
            .trim()
            .min(3, {
                message: 'Umrah description must be at least 3 characters',
            }),
        termsConditions: z
            .string({
                required_error: 'Terms conditions is required',
                invalid_type_error: 'Please provide a valid terms conditions',
            })
            .trim()
            .min(3, {
                message: 'Terms conditions must be at least 3 characters',
            }),
    })
    .strict();
