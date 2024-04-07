/**
 * @file /utils/verify-token.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const jwt = require('jsonwebtoken');
const { env } = require('../../config');

// verify token
const verifyToken = function (token) {
    try {
        if (!token) {
            throw new Error('Unauthorized');
        }

        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        throw new Error('Unauthorized');
    }
};

// export
module.exports = verifyToken;
