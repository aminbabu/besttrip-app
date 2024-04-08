/**
 * @file /middlewares/validators/customers/validate-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const { param } = require('express-validator');

// export validate customer by id middleware
module.exports = [param('id').exists().isMongoId().withMessage('Invalid customer id')];
