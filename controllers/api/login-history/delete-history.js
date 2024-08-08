/**
 * @file /controllers/api/login-history/delete-history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { LoginHistory } = require('../../../models');

// export delete history controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // find history by id
        const history = await LoginHistory.findById(id);

        // check if history exists
        if (!history) {
            return res.status(404).json({
                message: 'Login history not found',
            });
        }

        // delete history
        await history.deleteOne();

        // return response
        return res.status(200).json({
            message: 'Deleted login history successfully',
            history,
        });
    } catch (error) {
        return next(error);
    }
};
