/**
 * @file /middlewares/auth/is-api-valid.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 26 May, 2024
 * @update_date 28 May, 2024
 */

// dependencies
const { env } = require('../../config');

// export api key validation middleware
module.exports = (req, res, next) => {
    // get api key
    const apiKey = req.header('x-api-key');

    // check if api key is exist
    if (!apiKey) return res.status(401).json({ message: 'API key is required' });

    // check if api key is valid for frontend
    if (apiKey === env.FRONTEND_KEY) {
        res.locals.api = 'frontend';
        return next();
    }

    // check if api key is valid for backend
    if (apiKey === env.BACKEND_KEY) {
        res.locals.api = 'backend';
        return next();
    }

    // return error if api key is invalid
    return res.status(401).json({ message: 'Invalid API key' });
};
