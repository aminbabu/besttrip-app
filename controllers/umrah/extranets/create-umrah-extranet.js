/**
 * @file /controllers/umrah/extranets/create-umrah-extranet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahExtranet } = require('../../../models');

// export create umrah extranet controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // create umrah extranet
        const umrahExtranet = new UmrahExtranet(validatedData);

        // save umrah extranet
        await umrahExtranet.save();

        // send response
        return res.status(201).json({
            message: 'Created umrah extranet package successfully',
            umrahExtranet,
        });
    } catch (error) {
        return next(error);
    }
};
