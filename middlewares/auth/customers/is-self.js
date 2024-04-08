/**
 * @file /middlewares/auth/customers/is-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const { matchedData } = require('express-validator');

// is self middleware
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = matchedData(req);

        // check if customer is self
        if (id !== req.user._id) {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }

        // next middleware
        return next();
    } catch (error) {
        // error response
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
