/**
 * @file /controllers/umrah/extranets/get-umrah-extranets.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahExtranet } = require('../../../models');

// export get umrah extranets controller
module.exports = async (req, res, next) => {
    try {
        // get umrah extranets
        const umrahExtranets = await UmrahExtranet.find();

        // send response
        return res.status(200).json({
            message: 'Fetched umrah extranet packages successfully',
            umrahExtranets,
        });
    } catch (error) {
        return next(error);
    }
};
