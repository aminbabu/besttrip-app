/**
 * @file /constants/umrah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 17 May, 2024
 */

// umrah package package status
const UMRAH_PACKAGE_STATUS = ['active', 'disabled', 'draft'];

// umrah package package schudle
const UMRAH_PACKAGE_SCHEDULES = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
];

// umrah package package inclusions
const UMRAH_PACKAGE_INCLUSIONS = [
    'flight',
    'hotel',
    'visa',
    'transport',
    'food',
];

// umrah package outbound flight stops
const UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS = [0, 1, 2];

// umrah package distance units
const UMRAH_PACKAGE_DISTANCE_UNITS = ['m', 'km', 'mile'];

// umrah package includes
const UMRAH_PACKAGE_BOOLEAN = ['yes', 'no'];

// export umrah packages constants
module.exports = {
    UMRAH_PACKAGE_STATUS,
    UMRAH_PACKAGE_SCHEDULES,
    UMRAH_PACKAGE_INCLUSIONS,
    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
    UMRAH_PACKAGE_DISTANCE_UNITS,
    UMRAH_PACKAGE_BOOLEAN,
};
