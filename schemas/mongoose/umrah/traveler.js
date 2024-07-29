/**
 * @file /schemas/mongoose/umrah/traveler.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const {
    TRAVELERS_TYPES,
    TRAVELERS_GENDERS,
} = require('../../../constants/traveler');

// export traveler package type schema
module.exports = new Schema(
    {
        passport: {
            type: String,
            required: [true, 'Passport Image is required'],
        },
        travelerPhoto: {
            type: String,
            required: [true, 'Traveler Image is required'],
        },
        travelerNID: {
            type: String,
            required: [true, 'Traveler NID Image is required'],
        },
        travelerCovidCertificate: {
            type: String,
            required: [true, 'Traveler Covid Certificate Image is required'],
        },
        travelerType: {
            type: String,
            enum: TRAVELERS_TYPES,
            required: [true, 'Traveler Type is required'],
        },

        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        gender: {
            type: String,
            enum: TRAVELERS_GENDERS,
            default: TRAVELERS_GENDERS[0],
            required: [true, 'Gender is required'],
        },
        dateOfBirth: {
            type: Date,
            required: [true, 'Date Of Birth is required'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
        },
        cityName: {
            type: String,
            required: [true, 'City is required'],
        },
        passportNumber: {
            type: String,
            required: [true, 'Passport Number is required'],
        },
        documentIssueCountry: {
            type: String,
            required: [true, 'Document Issue Country is required'],
        },
        passportExpiryDate: {
            type: Date,
            required: [true, 'Passport Expiry Date is required'],
        },
        presentAddress: {
            type: String,
            required: [true, 'Present Address is required'],
        },
        permanentAddress: {
            type: String,
            required: [true, 'Permanent Address is required'],
        },
        emergencyContactNo: {
            type: String,
            required: [true, 'Emergency Contact No is required'],
        },
        email: {
            type: String,
            validate: {
                validator: function (value) {
                    // Email is only required for adults
                    return (
                        this.travelerType !== 'adult' ||
                        (value && value.length > 0)
                    );
                },
                message: 'Email is required for adult travelers',
            },
        },
        phone: {
            type: String,
            required: [true, 'Phone Number No is required'],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer ID is required'],
        },
        umrahPackage: {
            type: Schema.Types.ObjectId,
            ref: 'UmrahPackage',
            required: [true, 'Umrah package ID is required'],
        },
        UmrahBooking: {
            type: Schema.Types.ObjectId,
            ref: 'UmrahBooking',
            required: [true, 'UmrahBooking ID is required'],
        },
    },
    {
        timestamps: true,
    }
);
