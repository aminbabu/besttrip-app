/**
 * @file /controllers/api/login-history/get-history-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { LoginHistory } = require('../../../models');

// export get history by id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // find history by id
        const history = await LoginHistory.findById(id);

        // check if history exists
        if (!history) {
            return res.status(200).json({
                message: 'Login history not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched login history',
            history,
        });
    } catch (error) {
        return next(error);
    }
};
