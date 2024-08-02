/**
 * @file controllers/api/general-ledger/get-general-ledger-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2021
 * @update_date 23 June, 2021
 */

// dependencies
const { GeneralLedger } = require('../../../models');

// export get general ledger by id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get general ledger
        const generalLedger = await GeneralLedger.findById(id);

        // check if general ledger exists
        if (!generalLedger) {
            return res.status(200).json({
                message: 'General ledger not found',
            });
        }

        // send response
        return res.status(200).json({
            message: 'Fetched general ledger successfully',
            generalLedger,
        });
    } catch (error) {
        return next(error);
    }
};
