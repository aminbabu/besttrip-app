/**
 * @file /controllers/api/login-history/update-history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { LoginHistory } = require('../../../models');

// export update history controller
module.exports = async (req, res, next) => {
    try {
        // get history id
        const { id } = req.params;
        const validatedData = req.body;

        // find history by id
        const history = await LoginHistory.findById(id);

        // check if history exists
        if (!history) {
            return res.status(200).json({ msg: 'Login history not found' });
        }

        // set history data
        history.set(validatedData);

        // save history
        await history.save();

        // send response
        return res.status(200).json({
            message: 'History updated successfully',
            history,
        });
    } catch (error) {
        return next(error);
    }
};
