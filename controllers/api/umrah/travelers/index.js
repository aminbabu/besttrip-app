/**
 * @file /controllers/api/umrah/travelers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// export all travelers controllers
module.exports = {
    getAllTravelers: require('./get-all-travelers'),
    getTravelerById: require('./get-traveler-by-id'),
    createTraveler: require('./create-traveler'),
    updateTraveler: require('./update-traveler'),
    deleteTravelerById: require('./delete-traveler-by-id'),
};
