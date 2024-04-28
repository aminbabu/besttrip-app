/**
 * @file /middlewares/validators/umrah/extranets/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 April, 2024
 * @update_date 28 April, 2024
 */

// export umrah extranet validators
module.exports = {
    validateUmrahExtranetId: require('./validate-umrah-extranet-id'),
    validateUmrahExtranet: require('./validate-umrah-extranet'),
};
