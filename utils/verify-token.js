/**
 * @file /utils/verify-token.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./env');

// verify token
const verifyToken = function (token) {
    try {
        if (!token) {
            throw new Error('Unauthorized');
        }

        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Unauthorized');
    }
};

// export
module.exports = verifyToken;
