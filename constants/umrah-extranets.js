/**
 * @file /constants/umdah-extranets.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 25 April, 2024
 */

// umrah extranet package status
const UMDAH_EXTRANET_STATUS = ['active', 'disabled'];

// umrah extranet package inclusions
const UMDAH_EXTRANET_INCLUSIONS = ['flight', 'hotel', 'visa', 'transport', 'food'];

// umrah extranet package types
const UMDAH_EXTRANET_TYPES = ['economy', 'standard', 'premium'];

// umrah extranet outbound flight stops
const UMDAH_EXTRANET_OUTBOUND_FLIGHT_STOPS = [0, 1, 2];

// export umdah extranets constants
module.exports = {
    UMDAH_EXTRANET_STATUS,
    UMDAH_EXTRANET_INCLUSIONS,
    UMDAH_EXTRANET_TYPES,
    UMDAH_EXTRANET_OUTBOUND_FLIGHT_STOPS,
};
