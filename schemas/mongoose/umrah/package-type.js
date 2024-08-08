/**
 * @file /schemas/mongoose/umrah/package-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 25 Jul, 2024
 */

// dependencies
const { Schema } = require('mongoose');
const { UMRAH_PACKAGE_TYPE_STATUS } = require('../../../constants');

// export umrah package type schema
module.exports = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: [true, 'Name must be unique'],
        },
        status: {
            type: String,
            enum: UMRAH_PACKAGE_TYPE_STATUS,
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);
