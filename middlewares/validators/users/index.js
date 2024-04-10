/**
 * @file /middlewares/validators/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 10 April, 2024
 */

// export all validators
module.exports = {
    validateUserId: require('./validate-user-id'),
    validateUser: require('./validate-user'),
    validateUserSelf: require('./validate-user-self'),
};
