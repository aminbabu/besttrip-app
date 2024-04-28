/**
 * @file /controllers/umrah-extranets/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 28 April, 2024
 */

// export all umrah extranets controllers
module.exports = {
    getUmrahExtranets: require('./get-umrah-extranets'),
    getUmrahExtranet: require('./get-umrah-extranet'),
    createUmrahExtranet: require('./create-umrah-extranet'),
    updateUmrahExtranet: require('./update-umrah-extranet'),
    deleteUmrahExtranet: require('./delete-umrah-extranet'),
};
