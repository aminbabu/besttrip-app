/**
 * @file /utils/generate-token.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const jwt = require('jsonwebtoken');
const { env } = require('../../config');

// generate token
const generateToken = function (payload) {
    try {
        // check if payload is not an object
        if (typeof payload !== 'object') {
            throw new Error('Invalid payload');
        }

        // generate token
        return jwt.sign({ user: payload }, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRY,
        });
    } catch (error) {
        throw new Error(error);
    }
};

// export
module.exports = generateToken;
