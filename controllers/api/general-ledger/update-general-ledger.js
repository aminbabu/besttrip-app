/**
 * @file controllers/api/general-ledger/update-general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2021
 * @update_date 23 June, 2021
 */

// dependencies
const { GeneralLedger } = require('../../../models');

// export update general ledger controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedData = req.body;

        // get general ledger
        const generalLedger = await GeneralLedger.findById(id);

        // check if general ledger exists
        if (!generalLedger) {
            return res.status(200).json({
                message: 'General ledger not found',
            });
        }

        // set general ledger data
        generalLedger.set(validatedData);

        // save general ledger
        await generalLedger.save();

        // send response
        return res.status(201).json({
            message: 'Updated general ledger successfully',
            generalLedger,
        });
    } catch (error) {
        return next(error);
    }
};
