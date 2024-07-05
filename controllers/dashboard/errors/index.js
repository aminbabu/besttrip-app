/**
 * @file /controllers/errors/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 05 Jul, 2024
 */

// export error controllers
module.exports = {
    view401: require('./view-401'),
    view403: require('./view-403'),
    view404: require('./view-404'),
    view500: require('./view-500'),
};
