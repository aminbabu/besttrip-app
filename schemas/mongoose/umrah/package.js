/**
 * @file /schemas/mongoose/umrah/package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const {
    UMRAH_PACKAGE_STATUS,
    UMRAH_PACKAGE_TYPES,
    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
    UMRAH_PACKAGE_INCLUSIONS,
    UMRAH_PACKAGE_SCHEDULES,
    UMRAH_PACKAGE_BOOLEAN,
} = require('../../../constants');

// export umrah package schema
module.exports = new Schema(
    {
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required'],
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        subtitle: {
            type: String,
            required: [true, 'Subtitle is required'],
        },
        departureLocation: {
            type: String,
            required: [true, 'Departure location is required'],
        },
        schedule: {
            type: String,
            enum: UMRAH_PACKAGE_SCHEDULES,
            required: [true, 'Schedule is required'],
        },
        journeyDate: {
            type: Date,
            required: [true, 'Journey date is required'],
        },
        expiryDate: {
            type: Date,
            required: [true, 'Expiry date is required'],
        },
        totalDaysAndNights: {
            type: Schema.Types.ObjectId,
            ref: 'UmrahPackageDuration',
            required: [true, 'Umrah package Duration ID is required'],
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'UmrahPackageType',
            required: [true, 'Umrah package Duration ID is required'],
        },
        status: {
            type: String,
            enum: UMRAH_PACKAGE_STATUS,
            default: 'active',
        },
        adultPrice: {
            type: Number,
            required: [true, 'Adult price is required'],
        },
        adultPartialPrice: {
            type: Number,
            default: 0,
        },
        childPrice: {
            type: Number,
            required: [true, 'Child price is required'],
        },
        childPartialPrice: {
            type: Number,
            default: 0,
        },
        infantPrice: {
            type: Number,
            required: [true, 'Infant price is required'],
        },
        infantPartialPrice: {
            type: Number,
            default: 0,
        },
        partialPaymentExpiryDate: {
            type: Date,
        },
        seats: {
            type: Number,
            required: [true, 'Seats is required'],
        },
        inclusions: {
            type: [String],
            enum: UMRAH_PACKAGE_INCLUSIONS,
            required: [true, 'Inclusions is required'],
        },
        extraThumbnails: {
            type: [String],
        },
        outboundAirlineCode: {
            type: String,
            required: [true, 'Airline code is required'],
        },
        outboundFlightNumber: {
            type: String,
            required: [true, 'Flight number is required'],
        },
        outboundBookingClass: {
            type: String,
            required: [true, 'Booking class is required'],
        },
        outboundAirCraftModel: {
            type: String,
            required: [true, 'Aircraft model is required'],
        },
        outboundDepartureAirport: {
            type: String,
            required: [true, 'Departure airport is required'],
        },
        outboundArrivalAirport: {
            type: String,
            required: [true, 'Arrival airport is required'],
        },
        outboundDepartureDatetime: {
            type: Date,
            required: [true, 'Departure datetime is required'],
        },
        outboundArrivalDatetime: {
            type: Date,
            required: [true, 'Arrival datetime is required'],
        },
        outboundFlightStops: {
            type: Number,
            enum: UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
            required: [true, 'Flight stops is required'],
        },
        outboundLayoverFirstDuration: {
            type: String,
            required: [
                () =>
                    this.outboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st duration is required',
            ],
        },
        outboundLayoverFirstAirport: {
            type: String,
            required: [
                () =>
                    this.outboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st airport is required',
            ],
        },
        outboundLayoverSecondDuration: {
            type: String,
            required: [
                () =>
                    this.outboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
                'Layover 2nd duration is required',
            ],
        },
        outboundLayoverSecondAirport: {
            type: String,
            required: [
                () =>
                    this.outboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
                'Layover 2nd airport is required',
            ],
        },
        outboundAdultBaggageCheckin: {
            type: String,
            required: [true, 'Adult baggage is required'],
        },
        outboundAdultBaggageCabin: {
            type: String,
            required: [true, 'Adult cabin is required'],
        },
        outboundChildBaggageCheckin: {
            type: String,
            required: [true, 'Child baggage is required'],
        },
        outboundChildBaggageCabin: {
            type: String,
            required: [true, 'Child cabin is required'],
        },
        outboundInfantBaggageCheckin: {
            type: String,
            required: [true, 'Infant baggage is required'],
        },
        outboundInfantBaggageCabin: {
            type: String,
            required: [true, 'Infant cabin is required'],
        },
        makkahHotelThumbnail: {
            type: String,
            required: [true, 'Hotel thumbnail is required'],
        },
        makkahHotelNoOfNights: {
            type: Number,
            required: [true, 'Hotel nights is required'],
        },
        makkahHotelName: {
            type: String,
            required: [true, 'Hotel name is required'],
        },
        makkahHotelAddress: {
            type: String,
            required: [true, 'Hotel address is required'],
        },
        makkahHotelRating: {
            type: Number,
            required: [true, 'Hotel rating is required'],
        },
        makkahHotelDistance: {
            type: String,
            required: [true, 'Hotel distance is required'],
        },
        makkahHotelDistanceUnit: {
            type: String,
            required: [true, 'Hotel distance unit is required'],
        },
        makkahHotelWalkDuration: {
            type: String,
            required: [true, 'Hotel walk duration is required'],
        },
        makkahHotelLocation: {
            type: String,
            required: [true, 'Hotel location is required'],
        },
        makkahHotelNote: {
            type: String,
        },
        makkahHotelExtraThumbnails: {
            type: [String],
        },
        madinahHotelThumbnail: {
            type: String,
            required: [true, 'Hotel thumbnail is required'],
        },
        madinahHotelNoOfNights: {
            type: Number,
            required: [true, 'Hotel nights is required'],
        },
        madinahHotelName: {
            type: String,
            required: [true, 'Hotel name is required'],
        },
        madinahHotelAddress: {
            type: String,
            required: [true, 'Hotel address is required'],
        },
        madinahHotelRating: {
            type: Number,
            required: [true, 'Hotel rating is required'],
        },
        madinahHotelDistance: {
            type: String,
            required: [true, 'Hotel distance is required'],
        },
        madinahHotelDistanceUnit: {
            type: String,
            required: [true, 'Hotel distance unit is required'],
        },
        madinahHotelWalkDuration: {
            type: String,
            required: [true, 'Hotel walk duration is required'],
        },
        madinahHotelLocation: {
            type: String,
            required: [true, 'Hotel location is required'],
        },
        madinahHotelNote: {
            type: String,
        },
        madinahHotelExtraThumbnails: {
            type: [String],
        },
        inboundAirlineCode: {
            type: String,
            required: [true, 'Airline code is required'],
        },
        inboundFlightNumber: {
            type: String,
            required: [true, 'Flight number is required'],
        },
        inboundBookingClass: {
            type: String,
            required: [true, 'Booking class is required'],
        },
        inboundAirCraftModel: {
            type: String,
            required: [true, 'Aircraft model is required'],
        },
        inboundDepartureAirport: {
            type: String,
            required: [true, 'Departure airport is required'],
        },
        inboundArrivalAirport: {
            type: String,
            required: [true, 'Arrival airport is required'],
        },
        inboundDepartureDatetime: {
            type: Date,
            required: [true, 'Departure datetime is required'],
        },
        inboundArrivalDatetime: {
            type: Date,
            required: [true, 'Arrival datetime is required'],
        },
        inboundFlightStops: {
            type: Number,
            enum: UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
            required: [true, 'Flight stops is required'],
        },
        inboundLayoverFirstDuration: {
            type: String,
            required: [
                () =>
                    this.inboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st duration is required',
            ],
        },
        inboundLayoverFirstAirport: {
            type: String,
            required: [
                () =>
                    this.inboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st airport is required',
            ],
        },
        inboundLayoverSecondDuration: {
            type: String,
            required: [
                () =>
                    this.inboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
                'Layover 2nd duration is required',
            ],
        },
        inboundLayoverSecondAirport: {
            type: String,
            required: [
                () =>
                    this.inboundFlightStops ===
                    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
                'Layover 2nd airport is required',
            ],
        },
        inboundAdultBaggageCheckin: {
            type: String,
            required: [true, 'Adult baggage is required'],
        },
        inboundAdultBaggageCabin: {
            type: String,
            required: [true, 'Adult cabin is required'],
        },
        inboundChildBaggageCheckin: {
            type: String,
            required: [true, 'Child baggage is required'],
        },
        inboundChildBaggageCabin: {
            type: String,
            required: [true, 'Child cabin is required'],
        },
        inboundInfantBaggageCheckin: {
            type: String,
            required: [true, 'Infant baggage is required'],
        },
        inboundInfantBaggageCabin: {
            type: String,
            required: [true, 'Infant cabin is required'],
        },
        visaType: {
            type: String,
            required: [true, 'Visa type is required'],
        },
        visaNoOfEntries: {
            type: String,
            required: [true, 'Visa entries is required'],
        },
        visaDuration: {
            type: Number,
            required: [true, 'Visa duration is required'],
        },
        visaValidity: {
            type: Number,
            required: [true, 'Visa validity is required'],
        },
        visaOptions: {
            type: [String],
            required: [true, 'Visa options is required'],
        },
        visaNote: {
            type: String,
        },
        transportType: {
            type: String,
            required: [true, 'Transport type is required'],
        },
        transportAirportToHotel: {
            type: String,
            enum: ['Yes', 'No'],
            required: [true, 'Airport to hotel is required'],
        },
        transportVisitorPlaces: {
            type: String,
            enum: ['Yes', 'No'],
            required: [true, 'Visitor places is required'],
        },
        transportHotelToAirport: {
            type: String,
            enum: ['Yes', 'No'],
            required: [true, 'Hotel to airport is required'],
        },
        transportServices: {
            type: [String],
            required: [true, 'Transport services is required'],
        },
        transportServiceTypes: {
            type: [String],
            required: [true, 'Transport service types is required'],
        },
        transportNote: {
            type: String,
        },
        ziyarahDays: {
            type: Number,
            required: [true, 'Ziyara days is required'],
        },
        ziyarahMakkah: {
            type: String,
            enum: UMRAH_PACKAGE_BOOLEAN,
            required: [true, 'Ziyara makkah is required'],
        },
        ziyarahMadinah: {
            type: String,
            enum: UMRAH_PACKAGE_BOOLEAN,
            required: [true, 'Ziyara madinah is required'],
        },
        ziyarahTaif: {
            type: String,
            enum: UMRAH_PACKAGE_BOOLEAN,
            required: [true, 'Ziyara taif is required'],
        },
        ziyarahMakkahDetails: {
            type: [String],
            required: [true, 'Ziyara makkah details is required'],
        },
        ziyarahMadinahDetails: {
            type: [String],
            required: [true, 'Ziyara madinah details is required'],
        },
        ziyarahTaifDetails: {
            type: [String],
            required: [true, 'Ziyara taif details is required'],
        },
        ziyarahNote: {
            type: String,
        },
        itineraryDays: {
            type: [
                {
                    thumbnail: {
                        type: String,
                    },
                    title: {
                        type: String,
                    },
                    description: {
                        type: String,
                    },
                },
            ],
        },
        umrahThumbnail: {
            type: String,
            required: [true, 'Umrah thumbnail is required'],
        },
        umrahTitle: {
            type: String,
            required: [true, 'Umrah title is required'],
        },
        umrahExcerpt: {
            type: String,
            required: [true, 'Umrah short description is required'],
        },
        umrahDescription: {
            type: String,
            required: [true, 'Umrah description is required'],
        },
        termsConditions: {
            type: String,
            required: [true, 'Terms and conditions is required'],
        },
    },
    {
        timestamps: true,
    }
);
