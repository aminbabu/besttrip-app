/**
 * @file /config/database.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const mongoose = require('mongoose');
const { env } = require('../utils');

// connect to database
module.exports = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection failed');
    }
};
