/**
 * @file /constants/umdah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 10 May, 2024
 */

// umrah package package status
const UMDAH_PACKAGE_STATUS = ['active', 'disabled'];

// umrah package package schudle
const UMDAH_PACKAGE_SCHEDULES = [
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
const UMDAH_PACKAGE_INCLUSIONS = ['flight', 'hotel', 'visa', 'transport', 'food'];

// umrah package outbound flight stops
const UMDAH_PACKAGE_OUTBOUND_FLIGHT_STOPS = [0, 1, 2];

// export umdah packages constants
module.exports = {
    UMDAH_PACKAGE_STATUS,
    UMDAH_PACKAGE_SCHEDULES,
    UMDAH_PACKAGE_INCLUSIONS,
    UMDAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
};
