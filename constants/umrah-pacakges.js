/**
 * @file /constants/umdah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// umrah package package status
const UMDAH_PACKAGE_STATUS = ['active', 'disabled'];

// umrah package package inclusions
const UMDAH_PACKAGE_INCLUSIONS = ['flight', 'hotel', 'visa', 'transport', 'food'];

// umrah package package types
const UMDAH_PACKAGE_TYPES = ['economy', 'standard', 'premium'];

// umrah package outbound flight stops
const UMDAH_PACKAGE_OUTBOUND_FLIGHT_STOPS = [0, 1, 2];

// export umdah packages constants
module.exports = {
    UMDAH_PACKAGE_STATUS,
    UMDAH_PACKAGE_INCLUSIONS,
    UMDAH_PACKAGE_TYPES,
    UMDAH_PACKAGE_OUTBOUND_FLIGHT_STOPS,
};
