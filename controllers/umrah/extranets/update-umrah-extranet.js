/**
 * @file /controllers/umrah-extranets/update-umrah-extranet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahExtranet } = require('../../../models');

// export update umrah extranet controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedData = req.body;

        // get umrah extranet
        const umrahExtranet = await UmrahExtranet.findById(id);

        // check if umrah extranet exists
        if (!umrahExtranet) {
            return res.status(404).json({
                message: 'Umrah extranet package not found',
            });
        }

        // update umrah extranet
        umrahExtranet.set(validatedData);

        // save umrah extranet
        await umrahExtranet.save();

        // send response
        return res.status(200).json({
            message: 'Updated umrah extranet package successfully',
            umrahExtranet,
        });
    } catch (error) {
        return next(error);
    }
};
