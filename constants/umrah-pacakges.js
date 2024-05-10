/**
 * @file /constants/umdah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 10 May, 2024
 */

// umrah package package status
const UMRAH_PACKAGE_STATUS = ['active', 'disabled'];

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
const UMRAH_PACKAGE_INCLUSIONS = ['flight', 'hotel', 'visa', 'transport', 'food'];

// umrah package outbound flight stops
const UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS = [0, 1, 2];

// export umdah packages constants
module.exports = {
    UMRAH_PACKAGE_STATUS,
    UMRAH_PACKAGE_SCHEDULES,
    UMRAH_PACKAGE_INCLUSIONS,
    UMRAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
};
