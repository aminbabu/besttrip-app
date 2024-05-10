/**
 * @file /schemas/mongoose/umrah/package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 10 May, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const {
    UMRAH_PACKAGE_STATUS,
    UMRAH_PACKAGE_TYPES,
    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
    UMRAH_PACKAGE_INCLUSIONS,
    UMRAH_PACKAGE_SCHEDULES,
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
        type: {
            type: String,
            enum: UMRAH_PACKAGE_TYPES,
            required: [true, 'Type is required'],
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
                () => this.outboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st duration is required',
            ],
        },
        outboundLayoverFirstAirport: {
            type: String,
            required: [
                () => this.outboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st airport is required',
            ],
        },
        outboundLayoverSecondDuration: {
            type: String,
            required: [
                () => this.outboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
                'Layover 2nd duration is required',
            ],
        },
        outboundLayoverSecondAirport: {
            type: String,
            required: [
                () => this.outboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
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
        makkaHotelThumbnail: {
            type: String,
            required: [true, 'Hotel thumbnail is required'],
        },
        makkaHotelNoOfNights: {
            type: Number,
            required: [true, 'Hotel nights is required'],
        },
        makkaHotelName: {
            type: String,
            required: [true, 'Hotel name is required'],
        },
        makkaHotelAddress: {
            type: String,
            required: [true, 'Hotel address is required'],
        },
        makkaHotelRating: {
            type: Number,
            required: [true, 'Hotel rating is required'],
        },
        makkaHotelDistance: {
            type: String,
            required: [true, 'Hotel distance is required'],
        },
        makkaHotelDistanceUnit: {
            type: String,
            required: [true, 'Hotel distance unit is required'],
        },
        makkaHotelWalkDuration: {
            type: String,
            required: [true, 'Hotel walk duration is required'],
        },
        makkaHotelLocation: {
            type: String,
            required: [true, 'Hotel location is required'],
        },
        makkaHotelNote: {
            type: String,
        },
        makkaHotelExtraThumbnails: {
            type: [String],
        },
        madinaHotelThumbnail: {
            type: String,
            required: [true, 'Hotel thumbnail is required'],
        },
        madinaHotelNoOfNights: {
            type: Number,
            required: [true, 'Hotel nights is required'],
        },
        madinaHotelName: {
            type: String,
            required: [true, 'Hotel name is required'],
        },
        madinaHotelAddress: {
            type: String,
            required: [true, 'Hotel address is required'],
        },
        madinaHotelRating: {
            type: Number,
            required: [true, 'Hotel rating is required'],
        },
        madinaHotelDistance: {
            type: String,
            required: [true, 'Hotel distance is required'],
        },
        madinaHotelDistanceUnit: {
            type: String,
            required: [true, 'Hotel distance unit is required'],
        },
        madinaHotelWalkDuration: {
            type: String,
            required: [true, 'Hotel walk duration is required'],
        },
        madinaHotelLocation: {
            type: String,
            required: [true, 'Hotel location is required'],
        },
        madinaHotelNote: {
            type: String,
        },
        madinaHotelExtraThumbnails: {
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
                () => this.inboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st duration is required',
            ],
        },
        inboundLayoverFirstAirport: {
            type: String,
            required: [
                () => this.inboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[1],
                'Layover 1st airport is required',
            ],
        },
        inboundLayoverSecondDuration: {
            type: String,
            required: [
                () => this.inboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
                'Layover 2nd duration is required',
            ],
        },
        inboundLayoverSecondAirport: {
            type: String,
            required: [
                () => this.inboundFlightStops === UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS[2],
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
            type: Number,
            required: [true, 'Visa entries is required'],
        },
        visaDuration: {
            type: String,
            required: [true, 'Visa duration is required'],
        },
        visaValidity: {
            type: String,
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
            type: Boolean,
            required: [true, 'Airport to hotel is required'],
        },
        transportVisitorPlaces: {
            type: Boolean,
            required: [true, 'Visitor places is required'],
        },
        transportHotelToAirport: {
            type: Boolean,
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
        ziyaraDays: {
            type: Number,
            required: [true, 'Ziyara days is required'],
        },
        ziyaraMakka: {
            type: Boolean,
            required: [true, 'Ziyara makka is required'],
        },
        ziyaraMadina: {
            type: Boolean,
            required: [true, 'Ziyara madina is required'],
        },
        ziyaraTaif: {
            type: Boolean,
            required: [true, 'Ziyara taif is required'],
        },
        ziyaraMakkaDetails: {
            type: [String],
            required: [true, 'Ziyara makka details is required'],
        },
        ziyaraMadinaDetails: {
            type: [String],
            required: [true, 'Ziyara madina details is required'],
        },
        ziyaraTaifDetails: {
            type: [String],
            required: [true, 'Ziyara taif details is required'],
        },
        ziyaraNote: {
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
