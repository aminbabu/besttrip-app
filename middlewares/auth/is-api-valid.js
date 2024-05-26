/**
 * @file /middlewares/auth/is-api-valid.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 26 May, 2024
 * @update_date 26 May, 2024
 */

// dependencies
const { FRONTEND_KEY, BACKEND_KEY } = require('../../config');

// export api key validation middleware
module.exports = (req, res, next) => {
    // get api key
    const apiKey = req.headers['x-api-key'];

    // check if api key is valid for frontend
    if (apiKey === FRONTEND_KEY) {
        res.locals.api = 'frontend';
        return next();
    }

    // check if api key is valid for backend
    if (apiKey === BACKEND_KEY) {
        res.locals.api = 'backend';
        return next();
    }

    // return unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
};
