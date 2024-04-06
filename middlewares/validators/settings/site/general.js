/**
 * @file /middlewares/validators/settings/site/general.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 06 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../../handlers/errors');
const validateImage = require('../../../../utils/validate-image');
const formDataParser = require('../../../../utils/form-data-parser');
const prepareFormData = require('../../../../utils/prepare-form-data');
const { BRAND_LOGO_TYPES, FAVICON_TYPES } = require('../../../../constants/_media-files');

// export general site settings validator
module.exports = [
    formDataParser,
    body('logo').optional().custom(validateImage(BRAND_LOGO_TYPES)),
    body('favicon').optional().custom(validateImage(FAVICON_TYPES)),
    body('title').isArray({ min: 1, max: 1 }).withMessage('Title is required'),
    body('domain').optional().isArray({ min: 1 }).withMessage('Domain is required'),
    body('description')
        .optional()
        .isArray({ min: 1, max: 1 })
        .withMessage('Description is required'),
    expressValidator,
    prepareFormData,
];
